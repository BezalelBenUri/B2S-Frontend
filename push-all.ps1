param (
    [string]$personalMsg,
    [string]$orgMsg
)

if (-not $personalMsg -or -not $orgMsg) {
    Write-Host "❌ Usage: ./push-all.ps1 <personal commit message> <org commit message>"
    exit 1
}

git add .

git commit -m "$personalMsg" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ No new changes to commit for personal repo."
}

git push origin main
git push org HEAD:org-branch

Write-Host "`n✅ Pushed to personal (main) and organization (org-branch)"