<%@ page contentType="text/html;charset=UTF-8" %>
<!Doctype html>
<html lang="ko">
<head>
    <title></title>
</head>
<body>

<div align="center">
    <br>
    <br>
    <br>
    <form method="post" action="upload.go" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="upload" />
    </form>
    <br>
    <br>
    <input type="button" value="list" onclick="location.href='list.go'" />
</div>
</body>
</html>
