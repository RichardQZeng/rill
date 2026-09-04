package ai

import (
	"strings"
	"testing"
	"unicode/utf8"
)

func TestPromptToTitleTruncatesUnicode(t *testing.T) {
	got := promptToTitle(strings.Repeat("数", 51))
	want := strings.Repeat("数", 47) + "..."
	if got != want || !utf8.ValidString(got) {
		t.Fatalf("promptToTitle() = %q, want valid UTF-8 %q", got, want)
	}
}
