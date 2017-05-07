package ee.ttu.ui.repository;

import ee.ttu.ui.domain.GameMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameMatchRepository extends JpaRepository<GameMatch, Long> {

    @Query("SELECT match FROM GameMatch match WHERE match.roomIdentifier = :roomIdentifier")
    List<GameMatch> findAllGameMatchResultsByRoomIdentifier(@Param("roomIdentifier") String roomIdentifier);
}
