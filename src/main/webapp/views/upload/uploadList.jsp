<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Upload Page</title>
    <style>
        /* Style the Image Used to Trigger the Modal */
        .thumbnail {
            cursor: pointer;
        }

        /* The Modal (background) */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 50%; /* center horizontally */
            top: 50%; /* center vertically */
            transform: translate(-50%, -50%); /* adjust position */
            width: 50%;
            height: 50%;
            overflow: auto;
            background-color: rgba(0,0,0,0.5); /* adjust transparency */
        }

        /* Modal Content (Image) */
        .modal-content {
            margin: auto;
            display: block;
            width: 40%; /* reduce the width to 40% */
            max-width: 700px;
        }

        /* The Close Button */
        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
        }

        .close:hover,
        .close:focus {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
        }

        /* Add Animation */
        .modal-content, #caption {
            animation-name: zoom;
            animation-duration: 0.5s;
        }

        @keyframes zoom {
            from {transform:scale(0)}
            to {transform:scale(1)}
        }
    </style>
</head>
<body>

<div align="center">
    <h1>Uploaded Files</h1>
    <table align="center" border="1" width="50%">
        <c:forEach var="list" items="${requestScope.files}">
            <tr>
                <th>file name</th>
            </tr>

            <tr>
                <td>${list.fileName}</td>
                <td>
                    <img class="thumbnail" src="${list.imageUrl}" alt="Uploaded image" width="180" height="180" onclick="showModal(this)">
                </td>
            </tr>
        </c:forEach>
    </table>
</div>

<!-- The Modal -->
<div id="myModal" class="modal">
    <span class="close">[X]&times;</span> <!-- add the close button -->
    <img class="modal-content" id="img01">
    <div id="caption"></div>
</div>

<script>
    window.onload = function() {
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        window.showModal = function(img) {
            modal.style.display = "block";
            modalImg.src = img.src;
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
    }
</script>

</body>
</html>
