package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type payload struct {
	Name        string `json:"name"`
	Message     string `json:"message"`
	GeneratedAt string `json:"generated_at"`
}

func main() {
	out := payload{
		Name:        "test",
		Message:     "hello from Go",
		GeneratedAt: time.Now().UTC().Format(time.RFC3339),
	}

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")

	if err := encoder.Encode(out); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
