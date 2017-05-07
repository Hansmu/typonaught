package ee.ttu.ui.repository;

import ee.ttu.ui.domain.HighScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HighScoreRepository extends JpaRepository<HighScore, Long> {

    @Query("SELECT score FROM HighScore score WHERE score.playerIdentifier = :playerIdentifier")
    HighScore findOneByPlayerIdentifier(@Param("playerIdentifier") String playerIdentifier);
}
