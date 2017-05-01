package ee.ttu.ui.core;

import ee.ttu.ui.domain.Room;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class RoomService {

    private RoomRepository roomRepository;
    private JmsTemplate jmsTemplate;

    @Autowired
    public RoomService(RoomRepository roomRepository, JmsTemplate jmsTemplate) {
        this.roomRepository = roomRepository;
        this.jmsTemplate = jmsTemplate;
    }

    public String generateNewRoom(String playerOneIdentifier) {
        UUID newRoomId = UUID.randomUUID();
        Room room = new Room(newRoomId.toString(), playerOneIdentifier.toString());
        roomRepository.save(room);
        return newRoomId.toString();
    }

    public void setRoomPlayerStatusToReady(PlayerReadyJson playerReadyJson) {
        setRoomPlayerReady(playerReadyJson);
        jmsTemplate.convertAndSend(RoomReadyHandler.ROOM_READY_CHECKER, playerReadyJson.getRoomIdentifier());
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void setRoomPlayerReady(PlayerReadyJson playerReadyJson) {
        Room room = roomRepository.findOneByRoomIdentifier(playerReadyJson.getRoomIdentifier());

        if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerOneIdentifier())) {
            room.setPlayerOneReady(!room.getPlayerOneReady());
        } else if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerTwoIdentifier())) {
            room.setPlayerTwoReady(!room.getPlayerTwoReady());
        }
    }

    public boolean isRoomReady(String roomIdentifier) {
        String readyRoom = (String) jmsTemplate.receiveAndConvert(RoomReadyHandler.ROOM_READY);
        return readyRoom.equals(roomIdentifier);
    }

    private void setPlayerToReadyInGameroom(PlayerReadyJson playerReadyJson) {

    }

    public UUID generatePlayerId() {
        return UUID.randomUUID();
    }
}
