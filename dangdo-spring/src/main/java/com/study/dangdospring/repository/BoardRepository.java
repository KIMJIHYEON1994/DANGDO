package com.study.dangdospring.repository;

import com.study.dangdospring.entity.BoardEntity;
import com.study.dangdospring.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, String> {
//    public boolean existsByUserEmailAndUserPassword(String userEmail, String userPassword);
//
//    public UserEntity findByUserEmail(String userEmail);
    @Transactional
    void deleteBoardEntityByBoardSeq(Integer boardSeq);
}
