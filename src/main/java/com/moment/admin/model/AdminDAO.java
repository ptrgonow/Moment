package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AdminDAO {

    private static AdminDAO instance = null;

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    ConnectionPool cp = null;

    private AdminDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static AdminDAO getInstance() {
        if (instance == null) {
            instance = new AdminDAO();
        }
        return instance;
    }

    public void connect() {
        cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

    public List<AdminDTO> getNoticeList() throws SQLException {
        List<AdminDTO> list = new ArrayList<>();

        connect();

        pstmt = conn.prepareStatement(AdminSQL.SELECTION_NOTICE_LIST.getQuery());
        rs = pstmt.executeQuery();

        while (rs.next()) {
            AdminDTO dto = new AdminDTO();
            dto.setNotice_no(rs.getInt("notice_no"));
            dto.setNotice_title(rs.getString("notice_title"));
            dto.setNotice_cont(rs.getString("notice_cont"));
            dto.setNotice_date(rs.getString("notice_date"));
            list.add(dto);
        }

        disconnect(rs, pstmt, conn);

        return list;
    }
}
