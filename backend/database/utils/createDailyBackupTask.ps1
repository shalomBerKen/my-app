# Specify the task name and action
$TaskName = "DailyBackupTask"
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "node --env-file=C:\Users\user\Desktop\maat-project\my-app\backend\server\.env C:\Users\user\Desktop\maat-project\my-app\backend\database\utils\createDatabaseDump.js"


# Specify the trigger for daily execution
$Trigger = New-ScheduledTaskTrigger -Daily -At "3:00 AM"


# Create the task
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Settings (New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries)


# Register the task
Register-ScheduledTask -TaskName $TaskName -InputObject $Task
