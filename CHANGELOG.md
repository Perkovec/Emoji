# Change Log

All notable changes to the "emoji" extension will be documented in this file.

## [0.0.3] - 2016-12-10

- Initial release

## [1.0.0] - 2021-02-08
### Changed
- Migrated to TypeScript
- Renamed conmmand "emoji.indertEmoji" (with typo) to "emoji.insert"

### Added
- New "emoji.insertMarkdown" command, that insert Markdown emoji syntax like `:smile:` (thanks @itiut)

### Fixed
- Emojis whose codepoints are greater than 16 bits can't be displayed correctly with unicode escape `\uHHHH`, but with ES6 unicode codepoint escape `\u{.....}` (thanks @itiut)