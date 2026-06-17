package data

import (
	"backend-absensi/models"
)

const MaxStudents = 50
const MaxAttendances = 500

var Students [50]models.Student
var StudentCount = 15

var Attendances [500]models.Attendance
var AttendanceCount = 75

func init() {

	Students[0] = models.Student{NIM: "S001", Name: "Aditya Nugraha", Class: "TI-3A", Major: "Teknik Informatika", PersentaseKehadiran: 80.0, PersentasePerBulan: map[string]float64{"2026-06": 80.0}}
	Students[1] = models.Student{NIM: "S002", Name: "Budi Santoso", Class: "TI-3A", Major: "Teknik Informatika", PersentaseKehadiran: 60.0, PersentasePerBulan: map[string]float64{"2026-06": 60.0}}
	Students[2] = models.Student{NIM: "S003", Name: "Citra Dewi", Class: "TI-3B", Major: "Teknik Informatika", PersentaseKehadiran: 100.0, PersentasePerBulan: map[string]float64{"2026-06": 100.0}}
	Students[3] = models.Student{NIM: "S004", Name: "Dian Pratama", Class: "TI-3B", Major: "Teknik Informatika", PersentaseKehadiran: 40.0, PersentasePerBulan: map[string]float64{"2026-06": 40.0}}
	Students[4] = models.Student{NIM: "S005", Name: "Eka Putri", Class: "SI-2A", Major: "Sistem Informasi", PersentaseKehadiran: 100.0, PersentasePerBulan: map[string]float64{"2026-06": 100.0}}
	Students[5] = models.Student{NIM: "S006", Name: "Fajar Hidayat", Class: "SI-2A", Major: "Sistem Informasi", PersentaseKehadiran: 60.0, PersentasePerBulan: map[string]float64{"2026-06": 60.0}}
	Students[6] = models.Student{NIM: "S007", Name: "Gita Rahayu", Class: "SI-2B", Major: "Sistem Informasi", PersentaseKehadiran: 80.0, PersentasePerBulan: map[string]float64{"2026-06": 80.0}}
	Students[7] = models.Student{NIM: "S008", Name: "Hendra Wijaya", Class: "SI-2B", Major: "Sistem Informasi", PersentaseKehadiran: 20.0, PersentasePerBulan: map[string]float64{"2026-06": 20.0}}
	Students[8] = models.Student{NIM: "S009", Name: "Indah Sari", Class: "TI-3A", Major: "Teknik Informatika", PersentaseKehadiran: 100.0, PersentasePerBulan: map[string]float64{"2026-06": 100.0}}
	Students[9] = models.Student{NIM: "S010", Name: "Joko Susilo", Class: "TI-3A", Major: "Teknik Informatika", PersentaseKehadiran: 60.0, PersentasePerBulan: map[string]float64{"2026-06": 60.0}}
	Students[10] = models.Student{NIM: "S011", Name: "Kartika Sari", Class: "TI-3B", Major: "Teknik Informatika", PersentaseKehadiran: 80.0, PersentasePerBulan: map[string]float64{"2026-06": 80.0}}
	Students[11] = models.Student{NIM: "S012", Name: "Lutfi Anwar", Class: "SI-2A", Major: "Sistem Informasi", PersentaseKehadiran: 40.0, PersentasePerBulan: map[string]float64{"2026-06": 40.0}}
	Students[12] = models.Student{NIM: "S013", Name: "Maya Anggraini", Class: "SI-2A", Major: "Sistem Informasi", PersentaseKehadiran: 100.0, PersentasePerBulan: map[string]float64{"2026-06": 100.0}}
	Students[13] = models.Student{NIM: "S014", Name: "Nanda Kurniawan", Class: "SI-2B", Major: "Sistem Informasi", PersentaseKehadiran: 60.0, PersentasePerBulan: map[string]float64{"2026-06": 60.0}}
	Students[14] = models.Student{NIM: "S015", Name: "Omar Fauzi", Class: "SI-2B", Major: "Sistem Informasi", PersentaseKehadiran: 80.0, PersentasePerBulan: map[string]float64{"2026-06": 80.0}}

	Attendances[0] = models.Attendance{ID: "A001", NIM: "S001", Date: "2026-06-01", Status: "Hadir"}
	Attendances[1] = models.Attendance{ID: "A002", NIM: "S001", Date: "2026-06-02", Status: "Hadir"}
	Attendances[2] = models.Attendance{ID: "A003", NIM: "S001", Date: "2026-06-03", Status: "Hadir"}
	Attendances[3] = models.Attendance{ID: "A004", NIM: "S001", Date: "2026-06-04", Status: "Hadir"}
	Attendances[4] = models.Attendance{ID: "A005", NIM: "S001", Date: "2026-06-05", Status: "Izin"}
	Attendances[5] = models.Attendance{ID: "A006", NIM: "S002", Date: "2026-06-01", Status: "Hadir"}
	Attendances[6] = models.Attendance{ID: "A007", NIM: "S002", Date: "2026-06-02", Status: "Hadir"}
	Attendances[7] = models.Attendance{ID: "A008", NIM: "S002", Date: "2026-06-03", Status: "Hadir"}
	Attendances[8] = models.Attendance{ID: "A009", NIM: "S002", Date: "2026-06-04", Status: "Tidak Hadir"}
	Attendances[9] = models.Attendance{ID: "A010", NIM: "S002", Date: "2026-06-05", Status: "Izin"}
	Attendances[10] = models.Attendance{ID: "A011", NIM: "S003", Date: "2026-06-01", Status: "Hadir"}
	Attendances[11] = models.Attendance{ID: "A012", NIM: "S003", Date: "2026-06-02", Status: "Hadir"}
	Attendances[12] = models.Attendance{ID: "A013", NIM: "S003", Date: "2026-06-03", Status: "Hadir"}
	Attendances[13] = models.Attendance{ID: "A014", NIM: "S003", Date: "2026-06-04", Status: "Hadir"}
	Attendances[14] = models.Attendance{ID: "A015", NIM: "S003", Date: "2026-06-05", Status: "Hadir"}
	Attendances[15] = models.Attendance{ID: "A016", NIM: "S004", Date: "2026-06-01", Status: "Hadir"}
	Attendances[16] = models.Attendance{ID: "A017", NIM: "S004", Date: "2026-06-02", Status: "Hadir"}
	Attendances[17] = models.Attendance{ID: "A018", NIM: "S004", Date: "2026-06-03", Status: "Tidak Hadir"}
	Attendances[18] = models.Attendance{ID: "A019", NIM: "S004", Date: "2026-06-04", Status: "Izin"}
	Attendances[19] = models.Attendance{ID: "A020", NIM: "S004", Date: "2026-06-05", Status: "Sakit"}
	Attendances[20] = models.Attendance{ID: "A021", NIM: "S005", Date: "2026-06-01", Status: "Hadir"}
	Attendances[21] = models.Attendance{ID: "A022", NIM: "S005", Date: "2026-06-02", Status: "Hadir"}
	Attendances[22] = models.Attendance{ID: "A023", NIM: "S005", Date: "2026-06-03", Status: "Hadir"}
	Attendances[23] = models.Attendance{ID: "A024", NIM: "S005", Date: "2026-06-04", Status: "Hadir"}
	Attendances[24] = models.Attendance{ID: "A025", NIM: "S005", Date: "2026-06-05", Status: "Hadir"}
	Attendances[25] = models.Attendance{ID: "A026", NIM: "S006", Date: "2026-06-01", Status: "Hadir"}
	Attendances[26] = models.Attendance{ID: "A027", NIM: "S006", Date: "2026-06-02", Status: "Hadir"}
	Attendances[27] = models.Attendance{ID: "A028", NIM: "S006", Date: "2026-06-03", Status: "Hadir"}
	Attendances[28] = models.Attendance{ID: "A029", NIM: "S006", Date: "2026-06-04", Status: "Izin"}
	Attendances[29] = models.Attendance{ID: "A030", NIM: "S006", Date: "2026-06-05", Status: "Sakit"}
	Attendances[30] = models.Attendance{ID: "A031", NIM: "S007", Date: "2026-06-01", Status: "Hadir"}
	Attendances[31] = models.Attendance{ID: "A032", NIM: "S007", Date: "2026-06-02", Status: "Hadir"}
	Attendances[32] = models.Attendance{ID: "A033", NIM: "S007", Date: "2026-06-03", Status: "Hadir"}
	Attendances[33] = models.Attendance{ID: "A034", NIM: "S007", Date: "2026-06-04", Status: "Hadir"}
	Attendances[34] = models.Attendance{ID: "A035", NIM: "S007", Date: "2026-06-05", Status: "Izin"}
	Attendances[35] = models.Attendance{ID: "A036", NIM: "S008", Date: "2026-06-01", Status: "Hadir"}
	Attendances[36] = models.Attendance{ID: "A037", NIM: "S008", Date: "2026-06-02", Status: "Tidak Hadir"}
	Attendances[37] = models.Attendance{ID: "A038", NIM: "S008", Date: "2026-06-03", Status: "Izin"}
	Attendances[38] = models.Attendance{ID: "A039", NIM: "S008", Date: "2026-06-04", Status: "Sakit"}
	Attendances[39] = models.Attendance{ID: "A040", NIM: "S008", Date: "2026-06-05", Status: "Tidak Hadir"}
	Attendances[40] = models.Attendance{ID: "A041", NIM: "S009", Date: "2026-06-01", Status: "Hadir"}
	Attendances[41] = models.Attendance{ID: "A042", NIM: "S009", Date: "2026-06-02", Status: "Hadir"}
	Attendances[42] = models.Attendance{ID: "A043", NIM: "S009", Date: "2026-06-03", Status: "Hadir"}
	Attendances[43] = models.Attendance{ID: "A044", NIM: "S009", Date: "2026-06-04", Status: "Hadir"}
	Attendances[44] = models.Attendance{ID: "A045", NIM: "S009", Date: "2026-06-05", Status: "Hadir"}
	Attendances[45] = models.Attendance{ID: "A046", NIM: "S010", Date: "2026-06-01", Status: "Hadir"}
	Attendances[46] = models.Attendance{ID: "A047", NIM: "S010", Date: "2026-06-02", Status: "Hadir"}
	Attendances[47] = models.Attendance{ID: "A048", NIM: "S010", Date: "2026-06-03", Status: "Hadir"}
	Attendances[48] = models.Attendance{ID: "A049", NIM: "S010", Date: "2026-06-04", Status: "Tidak Hadir"}
	Attendances[49] = models.Attendance{ID: "A050", NIM: "S010", Date: "2026-06-05", Status: "Izin"}
	Attendances[50] = models.Attendance{ID: "A051", NIM: "S011", Date: "2026-06-01", Status: "Hadir"}
	Attendances[51] = models.Attendance{ID: "A052", NIM: "S011", Date: "2026-06-02", Status: "Hadir"}
	Attendances[52] = models.Attendance{ID: "A053", NIM: "S011", Date: "2026-06-03", Status: "Hadir"}
	Attendances[53] = models.Attendance{ID: "A054", NIM: "S011", Date: "2026-06-04", Status: "Hadir"}
	Attendances[54] = models.Attendance{ID: "A055", NIM: "S011", Date: "2026-06-05", Status: "Sakit"}
	Attendances[55] = models.Attendance{ID: "A056", NIM: "S012", Date: "2026-06-01", Status: "Hadir"}
	Attendances[56] = models.Attendance{ID: "A057", NIM: "S012", Date: "2026-06-02", Status: "Hadir"}
	Attendances[57] = models.Attendance{ID: "A058", NIM: "S012", Date: "2026-06-03", Status: "Izin"}
	Attendances[58] = models.Attendance{ID: "A059", NIM: "S012", Date: "2026-06-04", Status: "Tidak Hadir"}
	Attendances[59] = models.Attendance{ID: "A060", NIM: "S012", Date: "2026-06-05", Status: "Sakit"}
	Attendances[60] = models.Attendance{ID: "A061", NIM: "S013", Date: "2026-06-01", Status: "Hadir"}
	Attendances[61] = models.Attendance{ID: "A062", NIM: "S013", Date: "2026-06-02", Status: "Hadir"}
	Attendances[62] = models.Attendance{ID: "A063", NIM: "S013", Date: "2026-06-03", Status: "Hadir"}
	Attendances[63] = models.Attendance{ID: "A064", NIM: "S013", Date: "2026-06-04", Status: "Hadir"}
	Attendances[64] = models.Attendance{ID: "A065", NIM: "S013", Date: "2026-06-05", Status: "Hadir"}
	Attendances[65] = models.Attendance{ID: "A066", NIM: "S014", Date: "2026-06-01", Status: "Hadir"}
	Attendances[66] = models.Attendance{ID: "A067", NIM: "S014", Date: "2026-06-02", Status: "Hadir"}
	Attendances[67] = models.Attendance{ID: "A068", NIM: "S014", Date: "2026-06-03", Status: "Hadir"}
	Attendances[68] = models.Attendance{ID: "A069", NIM: "S014", Date: "2026-06-04", Status: "Izin"}
	Attendances[69] = models.Attendance{ID: "A070", NIM: "S014", Date: "2026-06-05", Status: "Tidak Hadir"}
	Attendances[70] = models.Attendance{ID: "A071", NIM: "S015", Date: "2026-06-01", Status: "Hadir"}
	Attendances[71] = models.Attendance{ID: "A072", NIM: "S015", Date: "2026-06-02", Status: "Hadir"}
	Attendances[72] = models.Attendance{ID: "A073", NIM: "S015", Date: "2026-06-03", Status: "Hadir"}
	Attendances[73] = models.Attendance{ID: "A074", NIM: "S015", Date: "2026-06-04", Status: "Hadir"}
	Attendances[74] = models.Attendance{ID: "A075", NIM: "S015", Date: "2026-06-05", Status: "Izin"}
}
