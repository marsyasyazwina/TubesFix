package utils

import (
	"backend-absensi/models"
)

func SequentialSearchByName(students [50]models.Student, count int, searchName string) []models.Student {
	var results []models.Student

	if searchName == "" {
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

func BinarySearchByDate(attendances []models.Attendance, searchDate string) *models.Attendance {
	sorted := make([]models.Attendance, len(attendances))
	copy(sorted, attendances)

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
