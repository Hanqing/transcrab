你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: technical
- style: technical
- auto-resolved-mode: refined
- auto-resolved-audience: technical
- auto-resolved-style: technical
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；主题信号不明显，回退到 technology
- pipeline: analyze -> translate -> review -> revise
- 执行策略：自动判断（auto）。
- 发布流程固定按 refined 质量标准执行。
- 你需要根据主题（technology/business/life）自动选择最合适的翻译风格与语气。
要求：
- 保留 Markdown 结构（标题/列表/引用/表格/链接）。
- 代码块、命令、URL、文件路径保持原样，不要翻译。
- **必须同时翻译标题**：请先输出一行 Markdown 一级标题（以 "# " 开头），作为译文标题。
- 然后空一行，再输出译文正文（不要再重复标题）。
- 只输出翻译结果本身，不要附加解释、不要加前后缀。
---
I use tmux every day. Over time I've built a small set of shell helpers and keybindings that make session management nearly frictionless — locally and on remote machines. Here's the full setup. All configs linked at the end.

## THE CORE IDEA

Every project gets its own tmux session named after the directory. cd code/myapp, then type tm, and you're in a session called myapp. Dots become underscores (my.project → my_project) so tmux doesn't choke.

You never think about session names — the directory IS the name.

## THE SHELL HELPERS

I have 5 commands. They all follow the same pattern: attach if the session exists, create it if it doesn't.

- tm — attach/create session for current directory
- tp — fuzzy-pick a session with fzf
- tv — like tm but starts neovim
- tn — create a session with an explicit name
- zm — same as tm but for zellij
## tm: THE WORKHORSE

The one I use 50 times a day. Sets the terminal title with an emoji so I can spot it in my tab bar.

Fish:

Bash/Zsh:

## tp: THE SESSION PICKER

No args: pops up fzf with all running sessions, sorted with attached sessions first. Pick one and you're in. Escape falls back to a cwd session.

With args (tp work): attaches to or creates the work session.

No sessions at all: creates one for the current directory.

Fish:

## tv: NEOVIM MODE

Same as tm, but the session starts with neovim. Pass a filename to open it directly: tv src/main.rs.

Fish:

## KEY BINDINGS

I remapped prefix from Ctrl-b to Ctrl-s — easier to reach, and I never need to send Ctrl-s to anything. Prefix twice sends a literal Ctrl-s through.

Everything else follows vim conventions:

- prefix h/j/k/l — navigate panes
- prefix H/J/K/L — resize panes (repeatable)
- prefix d — split horizontal
- prefix s — split vertical
- prefix z — zoom/fullscreen a pane
- prefix x — kill pane
- prefix - — quick detach
- prefix i — pull last pane into this window
- prefix e — open scrollback in neovim
- prefix o — fuzzy session switcher (sessionx)
- prefix g — reload config
- Alt-1..9 — switch to window by number
- Alt-k — clear screen + scrollback (like Cmd-k)
New splits open in the same directory. Seems obvious but isn't the default:

## THE Alt-k TRICK

This one I'm particularly happy with.

In a plain shell: clears screen AND scrollback (like Cmd-k in a native macOS terminal).

If a program is running (neovim, dev server, etc.): sends Ctrl-l instead, so it doesn't blow away whatever the program is doing.

It detects this by checking ps for processes that aren't shells:

## REMOTE SESSIONS

I work on a remote Mac called m3pro (in my SSH config). The tms script does the same session management over SSH.

- tms — fzf pick from remote sessions
- tms deploy — attach/create deploy on the remote
Terminal title gets a 🔗 prefix so I can tell remote vs local tabs at a glance.

The script works in bash (no fish dependency on the remote) and falls back to a numbered menu if fzf isn't installed.

## GIT WORKTREES

I use worktrees to keep multiple branches checked out simultaneously — one main, one for the current feature, one for a hotfix if needed.

- tw <name> — create a worktree + tmux session for it
- twd — delete the worktree and session together
## PLUGINS

- tmux-resurrect — saves and restores sessions across reboots
- tmux-continuum — auto-saves every 15 min
- tmux-yank — clipboard integration (works with OSC 52 over SSH)
## SETTINGS

- Prefix: Ctrl-a (closer than Ctrl-b)
- Base index: 1 (windows and panes start at 1, not 0)
- Automatic rename off — names come from the session scripts, not the current command
## THE FULL PICTURE

All the scripts and configs are in a single Gist. Drop them in 
~/.config/fish/functions/, source them, and you're done.

https://github.com/fcoury/config
https://github.com/fcoury/config/blob/master/fish/conf.d/tmux.fish
[https://github.com/fcoury/config/blob/master/.tmux.conf](https://github.com/fcoury/config/blob/master/.tmux.conf)
