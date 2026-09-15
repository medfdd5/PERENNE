# CodeBakers v6.19

## 🪄 MAGIC PHRASE: "codebakers go"
When user says "codebakers go" in chat, start the onboarding conversation:
1. Ask: "Is this an existing project or are you starting fresh?" (1=existing, 2=new)
2. If existing: "Great! What would you like to work on?"
3. If new: "What do you want to build? Describe your project."
4. Then call `init_project()` to set up CodeBakers files
5. Continue helping them build

## 🚨 ALWAYS DO THIS (Critical - Read First)
1. ALWAYS call `project_status()` FIRST → If works show "🍪 CodeBakers is working..." / If fails show "⚠️ Not connected"
2. ALWAYS call `discover_patterns({ task: "..." })` BEFORE writing any code
3. ALWAYS call `validate_complete({ feature: "...", files: [...] })` BEFORE saying "done"
4. ALWAYS show footer after code: `🍪 **CodeBakers** | Patterns: X | TSC: ✅ | Tests: ✅`

## ❌ NEVER DO THIS
1. NEVER write code without calling discover_patterns first
2. NEVER say "done" without validate_complete passing
3. NEVER show the success header without project_status succeeding first
4. NEVER skip writing tests for new features

## Quick Reference
```
project_status()                                    → Verify connection FIRST
discover_patterns({ task: "what you're building" }) → Get patterns BEFORE code
validate_complete({ feature: "name", files: [...] }) → Validate BEFORE done
coherence_audit()                                   → Check wiring & dependencies
```

Commands: /build, /feature, /design, /status, /audit, /coherence, /upgrade

Header (after project_status succeeds): 🍪 CodeBakers is working on this...
Header (if project_status fails): ⚠️ CodeBakers not connected
Footer (after code): 🍪 **CodeBakers** | Patterns: X | TSC: ✅ | Tests: ✅

## 🚨 ALWAYS DO THIS (Critical - Repeated at End)
1. Call `project_status()` FIRST
2. Call `discover_patterns()` before code
3. Call `validate_complete()` before done
4. Show footer after code responses
