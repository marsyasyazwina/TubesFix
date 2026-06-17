package models

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type StatsResponse struct {
	TotalStudents   int     `json:"total_students"`
	Hadir           int     `json:"hadir"`
	TidakHadir      int     `json:"tidak_hadir"`
	Izin            int     `json:"izin"`
	Sakit           int     `json:"sakit"`
	PersentaseHadir float64 `json:"persentase_hadir"`
}

type StudentStatsResponse struct {
	NIM        string  `json:"nim"`
	Name       string  `json:"name"`
	TotalHadir int     `json:"total_hadir"`
	TotalTidak int     `json:"total_tidak"`
	Persentase float64 `json:"persentase"`
}
