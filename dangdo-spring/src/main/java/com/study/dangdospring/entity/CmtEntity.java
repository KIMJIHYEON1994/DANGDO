package com.study.dangdospring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Comment")
@Table(name = "Comment")
public class CmtEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    private int boardNumber;
    private String userEmail;
    private String commentUserProfile;
    private String commentUserNickname;
    private String commentWriteDate;
    private String commentContent;
}
