package utils

import (
	"backend-absensi/models"
)

// Sequential Search untuk mencari siswa berdasarkan nama (tanpa break/continue)
func SequentialSearchByName(students [50]models.Student, count int, searchName string) []models.Student {
	var results []models.Student

	if searchName == "" {
		for i := 0; i < count; i++ {
			results = append(results, students[i])
		}
		return results
	}

	for i := 0; i < count; i++ {
		isMatch := true
		searchLower := toLower(searchName)
		nameLower := toLower(students[i].Name)

		if len(searchLower) > len(nameLower) {
			isMatch = false
		} else {
			for j := 0; j < len(searchLower) && isMatch; j++ {
				if nameLower[j] != searchLower[j] {
					isMatch = false
				}
			}
		}

		if isMatch {
			results = append(results, students[i])
		}
	}

	return results
}

// Insertion Sort untuk mengurutkan data absensi berdasarkan tanggal (ascending)
// digunakan sebagai persiapan sebelum Binary Search dijalankan
func insertionSortAttendanceByDate(arr []models.Attendance) {
	n := len(arr)
	for i := 1; i < n; i++ {
		current := arr[i]
		j := i - 1
		shouldShift := true

		for j >= 0 && shouldShift {
			if arr[j].Date > current.Date {
				arr[j+1] = arr[j]
				j = j - 1
			} else {
				shouldShift = false
			}
		}

		arr[j+1] = current
	}
}

// Binary Search untuk mencari absensi berdasarkan tanggal (data harus terurut)
func BinarySearchByDate(attendances []models.Attendance, searchDate string) *models.Attendance {
	sorted := make([]models.Attendance, len(attendances))
	copy(sorted, attendances)

	// Urutkan dulu dengan Insertion Sort manual (tanpa library)
	insertionSortAttendanceByDate(sorted)

	left := 0
	right := len(sorted) - 1
	var result *models.Attendance = nil
	found := false

	for left <= right && !found {
		mid := (left + right) / 2

		if sorted[mid].Date == searchDate {
			result = &sorted[mid]
			found = true
		} else if sorted[mid].Date < searchDate {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return result
}

// Helper function to lowercase string
func toLower(s string) string {
	result := ""
	for _, c := range s {
		if c >= 'A' && c <= 'Z' {
			result += string(c + 32)
		} else {
			result += string(c)
		}
	}
	return result
}
