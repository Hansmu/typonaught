package ee.ttu.ui.repository;

import ee.ttu.ui.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT room FROM Room room WHERE room.roomIdentifier = :roomIdentifier")
    Room findOneByRoomIdentifier(String roomIdentifier);

    @Query("SELECT room.roomIdentifier " +
            "FROM Room room " +
            "WHERE room.roomIdentifier IN :roomIdentifiers " +
            "   AND playerOneReady = true " +
            "   AND playerTwoReady = true")
    List<String> findReadyRoomsByIds(@Param("roomIdentifiers") List<String> roomIdentifiers);
}
