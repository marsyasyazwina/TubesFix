import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';
import Card from '../components/Card';
import AttendanceChip from '../components/AttendanceChip';

const API_BASE_URL = 'http://localhost:8080/api';

export default function SearchScreen() {
  const [students, setStudents] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  
  // ===== INPUT FIELDS =====
  const [searchName, setSearchName] = useState('');
  const [searchNIM, setSearchNIM] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // ===== RESULTS =====
  const [nameSearchResults, setNameSearchResults] = useState([]);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  
  // ===== STATE =====
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeResult, setActiveResult] = useState(null); // 'name' atau 'attendance'

  // Load data awal
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsRes, attendancesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/students/`).then(res => res.json()),
        fetch(`${API_BASE_URL}/attendances/`).then(res => res.json())
      ]);
      setStudents(studentsRes.data || []);
      setAllAttendances(attendancesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // ==================== SEQUENTIAL SEARCH BY NAME ====================
  const sequentialSearchByName = (data, searchKeyword) => {
    if (!searchKeyword.trim()) {
      return [];
    }
    
    const results = [];
    const keywordLower = searchKeyword.toLowerCase();
    
    for (let i = 0; i < data.length; i++) {
      const nameLower = data[i].name.toLowerCase();
      let isMatch = true;
      
      for (let j = 0; j < keywordLower.length; j++) {
        if (j >= nameLower.length || nameLower[j] !== keywordLower[j]) {
          isMatch = false;
          break;
        }
      }
      
      if (isMatch) {
        results.push(data[i]);
      }
    }
    
    return results;
  };

  // ==================== PENCARIAN NIM + TANGGAL ====================
  const isValidDate = (date) => {
    if (!date) return true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  };

  const searchByNIMAndDate = () => {
    let results = [...allAttendances];
    
    // Filter by NIM
    if (searchNIM.trim()) {
      results = results.filter(a => a.nim === searchNIM);
    }
    
    // Filter by start date
    if (startDate.trim()) {
      results = results.filter(a => a.date >= startDate);
    }
    
    // Filter by end date
    if (endDate.trim()) {
      results = results.filter(a => a.date <= endDate);
    }
    
    // Sort by date (newest first)
    results.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
    
    return results;
  };

  // ==================== MAIN SEARCH ====================
  const handleSearch = () => {
    const hasNameInput = searchName.trim().length > 0;
    const hasNIMInput = searchNIM.trim().length > 0;
    const hasDateInput = startDate.trim().length > 0 || endDate.trim().length > 0;
    
    if (!hasNameInput && !hasNIMInput && !hasDateInput) {
      Alert.alert('Error', 'Masukkan nama, NIM, atau tanggal untuk mencari');
      return;
    }
    
    // Validasi tanggal jika diisi
    if ((startDate && !isValidDate(startDate)) || (endDate && !isValidDate(endDate))) {
      Alert.alert('Error', 'Format tanggal harus YYYY-MM-DD (contoh: 2026-06-07)');
      return;
    }
    
    if (startDate && endDate && startDate > endDate) {
      Alert.alert('Error', 'Tanggal awal harus lebih kecil dari tanggal akhir');
      return;
    }
    
    setLoading(true);
    setHasSearched(true);
    
    // Cari berdasarkan nama (Sequential Search)
    let nameResults = [];
    if (hasNameInput) {
      nameResults = sequentialSearchByName(students, searchName);
      setNameSearchResults(nameResults);
    } else {
      setNameSearchResults([]);
    }
    
    // Cari berdasarkan NIM + tanggal
    let attendanceResultsData = [];
    let student = null;
    
    if (hasNIMInput || hasDateInput) {
      attendanceResultsData = searchByNIMAndDate();
      setAttendanceResults(attendanceResultsData);
      
      // Cari info mahasiswa jika NIM diisi
      if (searchNIM.trim()) {
        student = students.find(s => s.nim === searchNIM);
        setStudentInfo(student || null);
      } else {
        setStudentInfo(null);
      }
    } else {
      setAttendanceResults([]);
      setStudentInfo(null);
    }
    
    setLoading(false);
    
    // Tentukan hasil mana yang akan ditampilkan
    if (nameResults.length > 0) {
      setActiveResult('name');
    } else if (attendanceResultsData.length > 0) {
      setActiveResult('attendance');
    } else if (hasNameInput && nameResults.length === 0) {
      Alert.alert('Info', `Tidak ditemukan mahasiswa dengan nama "${searchName}"`);
      setActiveResult(null);
    } else if ((hasNIMInput || hasDateInput) && attendanceResultsData.length === 0) {
      Alert.alert('Info', 'Tidak ditemukan data kehadiran');
      setActiveResult(null);
    }
  };

  const handleReset = () => {
    setSearchName('');
    setSearchNIM('');
    setStartDate('');
    setEndDate('');
    setNameSearchResults([]);
    setAttendanceResults([]);
    setStudentInfo(null);
    setHasSearched(false);
    setActiveResult(null);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const [year, month, day] = dateString.split('-');
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  // Render item hasil pencarian nama
  const renderNameSearchItem = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultDetail}>NIM: {item.nim}</Text>
        <Text style={styles.resultDetail}>{item.class} - {item.major}</Text>
      </View>
    </View>
  );

  // Render item hasil pencarian kehadiran
  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <View style={styles.attendanceItemLeft}>
        <Text style={styles.attendanceItemDate}>📅 {formatDisplayDate(item.date)}</Text>
      </View>
      <View style={styles.attendanceItemRight}>
        <AttendanceChip status={item.status} />
      </View>
    </View>
  );

  // Hitung statistik kehadiran
  const getAttendanceStats = () => {
    const hadir = attendanceResults.filter(r => r.status === 'Hadir').length;
    const tidakHadir = attendanceResults.filter(r => r.status === 'Tidak Hadir').length;
    const izin = attendanceResults.filter(r => r.status === 'Izin').length;
    const sakit = attendanceResults.filter(r => r.status === 'Sakit').length;
    const total = attendanceResults.length;
    const persentaseHadir = total > 0 ? (hadir / total * 100).toFixed(1) : 0;
    
    return { hadir, tidakHadir, izin, sakit, total, persentaseHadir };
  };

  const stats = getAttendanceStats();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Pencarian Data Mahasiswa & Kehadiran</Text>
      <Text style={styles.subtitle}>
        Cari mahasiswa berdasarkan nama (Sequential Search) atau cari riwayat kehadiran berdasarkan NIM dan tanggal.
      </Text>

      <Card style={styles.formCard}>
        {/* Search by Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cari Mahasiswa Berdasarkan Nama</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama atau sebagian nama (contoh: Adi, Budi)"
            placeholderTextColor={colors.outline}
            value={searchName}
            onChangeText={setSearchName}
          />
        
        </View>

        {/* Separator */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ATAU</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Search by NIM + Date */}
        <View>
          <Text style={styles.label}>Cari Riwayat Kehadiran</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.subLabel}>NIM Mahasiswa</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: S001"
              placeholderTextColor={colors.outline}
              value={searchNIM}
              onChangeText={setSearchNIM}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.dateRangeContainer}>
            <Text style={styles.subLabel}>Filter Tanggal</Text>
            <View style={styles.dateRangeRow}>
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateLabel}>Dari</Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder="2024-01-01"
                  placeholderTextColor={colors.outline}
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateLabel}>Sampai</Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder="2024-12-31"
                  placeholderTextColor={colors.outline}
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>
            <Text style={styles.dateHint}>Format: YYYY-MM-DD (contoh: 2026-06-07)</Text>
          </View>
        
        </View>

        {/* Tombol Aksi */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.searchButtonText}>Cari Data</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* HASIL PENCARIAN NAMA */}
      {hasSearched && !loading && activeResult === 'name' && nameSearchResults.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>📋 HASIL PENCARIAN MAHASISWA</Text>
          <Text style={styles.resultCount}>Ditemukan {nameSearchResults.length} mahasiswa</Text>
          <FlatList
            data={nameSearchResults}
            keyExtractor={(item) => item.nim}
            renderItem={renderNameSearchItem}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* HASIL PENCARIAN KEHADIRAN */}
      {hasSearched && !loading && activeResult === 'attendance' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>📋 HASIL PENCARIAN KEHADIRAN</Text>
          
          {/* Informasi Mahasiswa */}
          {studentInfo && (
            <Card style={styles.studentInfoCard}>
              <Text style={styles.studentName}>{studentInfo.name}</Text>
              <Text style={styles.studentNim}>NIM: {studentInfo.nim}</Text>
              <Text style={styles.studentClass}>{studentInfo.class} - {studentInfo.major}</Text>
            </Card>
          )}

          {/* Statistik Ringkasan */}
          {attendanceResults.length > 0 && (
            <Card style={styles.statsCard}>
              <Text style={styles.statsTitle}>Ringkasan Kehadiran</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.hadirNumber]}>{stats.hadir}</Text>
                  <Text style={styles.statLabel}>Hadir</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.tidakHadirNumber]}>{stats.tidakHadir}</Text>
                  <Text style={styles.statLabel}>Tidak Hadir</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.izinNumber]}>{stats.izin}</Text>
                  <Text style={styles.statLabel}>Izin</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.sakitNumber]}>{stats.sakit}</Text>
                  <Text style={styles.statLabel}>Sakit</Text>
                </View>
              </View>
              <View style={styles.persentaseContainer}>
                <Text style={styles.persentaseLabel}>Persentase Kehadiran:</Text>
                <Text style={styles.persentaseValue}>{stats.persentaseHadir}%</Text>
              </View>
              <Text style={styles.totalRecord}>Total {stats.total} catatan kehadiran</Text>
            </Card>
          )}

          {/* Daftar Kehadiran */}
          {attendanceResults.length > 0 && (
            <Card style={styles.attendanceListCard}>
              <Text style={styles.attendanceListTitle}>📋 Daftar Kehadiran</Text>
              <FlatList
                data={attendanceResults}
                keyExtractor={(item) => item.id}
                renderItem={renderAttendanceItem}
                scrollEnabled={false}
              />
            </Card>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  title: {
    ...typography.headlineMedium,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },
  formCard: {
    padding: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  subLabel: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  input: {
    height: spacing.touchTarget,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    ...typography.bodyMedium,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
  },
  noteText: {
    ...typography.labelSmall,
    color: colors.outline,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  separatorText: {
    ...typography.labelSmall,
    color: colors.outline,
    marginHorizontal: spacing.md,
  },
  dateRangeContainer: {
    marginBottom: spacing.md,
  },
  dateRangeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dateInputWrapper: {
    flex: 1,
  },
  dateLabel: {
    ...typography.labelSmall,
    color: colors.outline,
    marginBottom: 2,
  },
  dateInput: {
    height: spacing.touchTarget,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    ...typography.bodyMedium,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
  },
  dateHint: {
    ...typography.labelSmall,
    color: colors.outline,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  searchButton: {
    flex: 2,
    height: spacing.touchTarget,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    ...typography.labelLarge,
    color: colors.onPrimary,
  },
  resetButton: {
    flex: 1,
    height: spacing.touchTarget,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  resultContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  resultTitle: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
  resultCount: {
    ...typography.labelSmall,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  // Result Item (Name Search)
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.headlineSmall,
    color: colors.onPrimaryContainer,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    ...typography.bodyLarge,
    color: colors.onSurface,
    fontWeight: '600',
  },
  resultDetail: {
    ...typography.labelSmall,
    color: colors.outline,
    marginTop: 2,
  },
  // Attendance Results
  studentInfoCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  studentName: {
    ...typography.headlineSmall,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  studentNim: {
    ...typography.bodyMedium,
    color: colors.outline,
    marginBottom: spacing.xs,
  },
  studentClass: {
    ...typography.bodyMedium,
    color: colors.secondary,
  },
  statsCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statsTitle: {
    ...typography.labelLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.headlineSmall,
  },
  hadirNumber: { color: colors.present },
  tidakHadirNumber: { color: colors.absent },
  izinNumber: { color: colors.permission },
  sakitNumber: { color: colors.sick },
  statLabel: {
    ...typography.labelSmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  persentaseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  persentaseLabel: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  persentaseValue: {
    ...typography.headlineSmall,
    color: colors.primary,
  },
  totalRecord: {
    ...typography.labelSmall,
    color: colors.outline,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  attendanceListCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  attendanceListTitle: {
    ...typography.labelLarge,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  attendanceItemLeft: {
    flex: 1,
  },
  attendanceItemDate: {
    ...typography.bodyMedium,
    color: colors.onSurface,
  },
  attendanceItemRight: {
    width: 100,
    alignItems: 'flex-end',
  },
});
