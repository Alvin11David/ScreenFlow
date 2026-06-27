param(
    [int]$IntervalSeconds = 30,
    [string]$CommitMessage = "auto: update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "Watching for changes every $IntervalSeconds seconds..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Cyan

while ($true) {
    $status = git status --porcelain
    if ($status) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected:" -ForegroundColor Yellow
        $status | ForEach-Object { Write-Host "  $_" }
        git add -A
        $msg = $CommitMessage -f (Get-Date)
        git commit -m $msg
        if ($?) {
            git push
            if ($?) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Pushed successfully." -ForegroundColor Green
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Push failed." -ForegroundColor Red
            }
        } else {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Nothing to commit." -ForegroundColor Gray
        }
    }
    Start-Sleep -Seconds $IntervalSeconds
}
