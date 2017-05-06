package ee.ttu.ui.core;

import ee.ttu.ui.domain.Room;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.domain.json.RoomCreateJson;
import ee.ttu.ui.domain.json.WordResult;
import ee.ttu.ui.repository.RoomRepository;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    public String setRoomPlayerStatusToReady(PlayerReadyJson playerReadyJson) {
        return setRoomPlayerReady(playerReadyJson);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private String setRoomPlayerReady(PlayerReadyJson playerReadyJson) {
        Room room = roomRepository.findOneByRoomIdentifier(playerReadyJson.getRoomIdentifier());

        if (room.getPlayerTwoIdentifier() == null) {
            room.setPlayerTwoReady(true);
            roomRepository.save(room);
        }

        return room.getRoomIdentifier();
    }

    public boolean isRoomReady(String roomIdentifier) {
        Room room = roomRepository.findOneByRoomIdentifier(roomIdentifier);
        return room.getPlayerOneReady() && room.getPlayerTwoReady();
    }

    public UUID generatePlayerId() {
        return UUID.randomUUID();
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomByIdentifier(String roomId) {
        return roomRepository.findOneByRoomIdentifier(roomId);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public boolean determineWinner(WordResult wordResult) {
        String userIdentifier = wordResult.getUserIdentifier();
        String roomIdentifier = wordResult.getRoomIdentifier();
        Room room = roomRepository.findOneByRoomIdentifier(roomIdentifier);

        boolean isPlayerOne = room.getPlayerOneIdentifier().equals(userIdentifier);

        if (wordResult.isWordCorrect()) {
            if (isPlayerOne) {
                room.setPlayerOneScore(1);
            } else {
                room.setPlayerTwoScore(1);
            }
        } else {
            if (isPlayerOne) {
                room.setPlayerOneScore(0);
            } else {
                room.setPlayerTwoScore(0);
            }
        }

        boolean isFirst = isPlayerOne ? room.getPlayerTwoScore() == null && wordResult.isWordCorrect() : room.getPlayerOneScore() == null && wordResult.isWordCorrect();

        if (room.getPlayerOneScore() != null && room.getPlayerTwoScore() != null) {
            room.setPlayerOneScore(null);
            room.setPlayerTwoScore(null);

            room.setPlayerOneReady(false);
            room.setPlayerTwoReady(false);
        }

        roomRepository.save(room);

        return isFirst;
    }
}
