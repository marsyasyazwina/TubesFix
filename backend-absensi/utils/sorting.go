package utils

import (
	"backend-absensi/models"
)

func SelectionSortByName(students []models.Student, ascending bool) []models.Student {
	arr := make([]models.Student, len(students))
	copy(arr, students)
	n := len(arr)

	for i := 0; i < n-1; i++ {
		targetIndex := i

		for j := i + 1; j < n; j++ {
			var condition bool
			if ascending {
				condition = arr[j].Name < arr[targetIndex].Name
			} else {
				condition = arr[j].Name > arr[targetIndex].Name
			}

			if condition {
				targetIndex = j
			}
		}

		if targetIndex != i {
			arr[i], arr[targetIndex] = arr[targetIndex], arr[i]
		}
	}

	return arr
}

func InsertionSortByPercentage(stats []models.StudentStatsResponse, ascending bool) []models.StudentStatsResponse {
	arr := make([]models.StudentStatsResponse, len(stats))
	copy(arr, stats)
	n := len(arr)

	for i := 1; i < n; i++ {
		current := arr[i]
		j := i - 1
		shouldShift := true

		for j >= 0 && shouldShift {
			var condition bool
			if ascending {
				condition = current.Persentase < arr[j].Persentase
			} else {
				condition = current.Persentase > arr[j].Persentase
			}

			if condition {
				arr[j+1] = arr[j]
				j = j - 1
			} else {
				shouldShift = false
			}
		}

		arr[j+1] = current
	}

	return arr
}

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
