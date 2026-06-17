package models

type Student struct {
	NIM                 string             `json:"nim" gorm:"primaryKey"`
	Name                string             `json:"name"`
	Class               string             `json:"class"`
	Major               string             `json:"major"`
	PersentaseKehadiran float64            `json:"persentase_kehadiran"`
	PersentasePerBulan  map[string]float64 `json:"persentase_per_bulan"`
}

type StudentInput struct {
	Name  string `json:"name" binding:"required"`
	Class string `json:"class" binding:"required"`
	Major string `json:"major" binding:"required"`
}
