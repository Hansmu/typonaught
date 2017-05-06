package ee.ttu.ui.core;

import ee.ttu.ui.domain.Room;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.domain.json.RoomCreateJson;
import ee.ttu.ui.repository.RoomRepository;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class RoomService {

    private RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public String generateNewRoom(RoomCreateJson roomCreateJson) {
        UUID newRoomId = UUID.randomUUID();
        Room room = new Room(newRoomId.toString(), roomCreateJson.getPlayerIdentifier());
        room.setTypingText(Jsoup.parse(roomCreateJson.getTypingText()).text());
        roomRepository.save(room);
        return newRoomId.toString();
    }

    public void setRoomPlayerStatusToReady(PlayerReadyJson playerReadyJson) {
        setRoomPlayerReady(playerReadyJson);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void setRoomPlayerReady(PlayerReadyJson playerReadyJson) {
        Room room = roomRepository.findOneByRoomIdentifier(playerReadyJson.getRoomIdentifier());

        if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerOneIdentifier())) {
            room.setPlayerOneReady(!room.getPlayerOneReady());
        } else if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerTwoIdentifier())) {
            room.setPlayerTwoReady(!room.getPlayerTwoReady());
        }

        roomRepository.save(room);
    }

    public boolean isRoomReady(String roomIdentifier) {
        Room room = roomRepository.findOneByRoomIdentifier(roomIdentifier);
        return room.getPlayerOneReady() && room.getPlayerTwoReady();
    }

    public UUID generatePlayerId() {
        return UUID.randomUUID();
    }
}
