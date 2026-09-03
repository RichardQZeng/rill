package server

import "testing"

func TestRedactedVariables(t *testing.T) {
	got := redactedVariables(map[string]string{"SECRET": "value"})
	if got["SECRET"] != "[redacted]" {
		t.Fatalf("secret value was not redacted: %q", got["SECRET"])
	}
}

func TestIsEnvironmentFile(t *testing.T) {
	for filePath, want := range map[string]bool{
		".env":             true,
		"/.env.local":      true,
		"models/model.sql": false,
	} {
		if got := isEnvironmentFile(filePath); got != want {
			t.Errorf("isEnvironmentFile(%q) = %v, want %v", filePath, got, want)
		}
	}
}
