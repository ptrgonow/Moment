package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class NoticeDAO {

    private static NoticeDAO instance = null;

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    ConnectionPool cp = null;

    private NoticeDAO() {
        cp = ConnectionPool.getInstance();

    }

    public static NoticeDAO getInstance() {
        if (instance == null) {
            instance = new NoticeDAO();
        }
        return instance;
    }

    public void connect() {
        conn = cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

    public List<NoticeDTO> getNoticeList() throws SQLException {

        List<NoticeDTO> list = new ArrayList<>();
        NoticeDTO dto = null;
        connect();

        pstmt = conn.prepareStatement(AdminSQL.SELECTION_NOTICE_LIST.getQuery());
        rs = pstmt.executeQuery();

        while (rs.next()) {
            dto = new NoticeDTO();
            dto.setNoticeNo(rs.getInt("notice_no"));
            dto.setNoticeTitle(rs.getString("notice_title"));
            dto.setNoticeWriter(rs.getString("notice_writer"));
            dto.setNoticeCont(rs.getString("notice_cont"));
            dto.setNoticeDate(rs.getString("notice_date"));

            list.add(dto);
        }

        disconnect(rs, pstmt, conn);

        return list;
    }

    public int insertNotice(NoticeDTO dto) {

        int result = 0;
        int noticeNo = 0;
        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.SELECTION_MAX_NOTICE_NO.getQuery());
            rs = pstmt.executeQuery();

            if (rs.next()) {
                noticeNo = rs.getInt(1);
            }

            pstmt = conn.prepareStatement(AdminSQL.INSERT_NOTICE.getQuery());
            pstmt.setInt(1, noticeNo);
            pstmt.setString(2, dto.getNoticeTitle());
            pstmt.setString(3, dto.getNoticeWriter());
            pstmt.setString(4, dto.getNoticeCont());
            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("등록 에러 : " + e);
        } finally {
            disconnect(pstmt, conn);
        }
        return result;
    }

    public int deleteNotice(int noticeNo) {

        int result = 0;
        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.DELETE_NOTICE.getQuery());
            pstmt.setInt(1, noticeNo);
            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("삭제 에러 : " + e);
        } finally {
            disconnect(pstmt, conn);
        }

        return result;
    }

    public void updateSequence(int noticeNo) {

        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.UPDATE_NOTICE_NO.getQuery());
            pstmt.setInt(1, noticeNo);
            pstmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("번호 조정 에러 : " + e);
        } finally {
            disconnect(pstmt, conn);
        }
    }

    public int updateNotice(NoticeDTO dto) {

        int result = 0;
        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.UPDATE_NOTICE_CONTENT.getQuery());

            pstmt.setString(1, dto.getNoticeTitle());
            pstmt.setString(2, dto.getNoticeWriter());
            pstmt.setString(3, dto.getNoticeCont());
            pstmt.setInt(4, dto.getNoticeNo());
            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            System.out.println("수정 에러 : " + e);
        } finally {
            disconnect(pstmt, conn);
        }

        return result;
    }
}
