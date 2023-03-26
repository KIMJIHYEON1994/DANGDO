package com.study.dangdospring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.study.dangdospring.entity.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    public boolean existsByUserEmailAndUserPwd(String userEmail, String userPwd);

    public UserEntity findByUserEmail(String userEmail);
}
