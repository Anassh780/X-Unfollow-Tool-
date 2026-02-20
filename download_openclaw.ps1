[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2YyMzgxODY4MTZhNjQ0ODI4NzllNjY0OWE5MGY1NjJiEgsSBxC--bHGwBcYAZIBIwoKcHJvamVjdF9pZBIVQhMxOTg4MjUyMjAxNjU5NjU1Njk3&filename=&opi=89354086"
$output = "c:/Users/IRON MAN/Desktop/4.9_0/temp_openclaw.html"
Invoke-WebRequest -Uri $url -OutFile $output
