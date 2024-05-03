<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 25.
  Time: 오후 8:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Diary</title>
</head>
<body>

<jsp:include page="/views/Header/header.jsp" />

<div class="container">

    <div class="side-container">
        <a href="#" class="bi bi-arrow-left"></a>
        <a href="#" class="bi bi-arrow-right"></a>

        <!-- 기능 토글러 -->
    </div>

    <div class="view-container">
        <!-- 이미지 미리보기 -->
    </div>

    <div class="editing-container">
        <div class="color"><span class="bi bi-palette"></span>배경</div>

        <div class="palette">
            <div class="color-selector">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <div class="color-selector">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>


            </div>
        </div>
        <div>
            <label for="textBox"><i class="bi bi-pencil"></i>텍스트를 입력하세요</label>
            <input type="text" class="text-edit" id="textBox">
        </div>
        <div>
            <button id="addButton" class="plus-btn"><i class="bi bi-journal-plus"></i></button>
            <button id="plusButton" class="plus-btn"><i class="bi bi-journal-check"></i></button>
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/JS/Diary/Psn/PsnMain.js"></script>
</body>
</html>
