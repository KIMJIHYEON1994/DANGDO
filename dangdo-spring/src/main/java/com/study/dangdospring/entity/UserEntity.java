package com.study.dangdospring.entity;

import com.study.dangdospring.dto.SignUpDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity(name="TB_USER")
@Table(name="TB_USER")
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    private String userEmail;
    private String userPwd;
    private String userName;
    private String userHp;
    private String userAddr;
    private int userDangdo;
    private String userProfile;

    public UserEntity(SignUpDto dto) {
        this.userEmail = dto.getUserEmail();
        this.userPwd = dto.getUserPwd();
        this.userName = dto.getUserName();
        this.userHp = dto.getUserHp();
        this.userAddr = dto.getUserAddr() + " " + dto.getUserAddrDetail();
        this.userDangdo = dto.getUserDangdo();
        this.userProfile = dto.getUserProfile();
    }
}
