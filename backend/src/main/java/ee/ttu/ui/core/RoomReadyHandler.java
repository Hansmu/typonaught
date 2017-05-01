package ee.ttu.ui.core;

import ee.ttu.ui.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class RoomReadyHandler {

    public static final String ROOM_READY_CHECKER = "room.ready.checker";
    public static final String ROOM_READY = "room.ready";

    private static List<String> roomsWaitingForReady = new ArrayList<>();

    private RoomRepository roomRepository;

    @Autowired
    public RoomReadyHandler(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @JmsListener(destination = ROOM_READY_CHECKER)
    @SendTo(value = ROOM_READY)
    public String getRoomReady(String roomIdToCheckForReady) {
        if (!roomsWaitingForReady.contains(roomIdToCheckForReady)) {
            roomsWaitingForReady.add(roomIdToCheckForReady);
        }

        while (true) {
            List<String> readyRooms = roomRepository.findReadyRoomsByIds(roomsWaitingForReady);

            if (readyRooms.contains(roomIdToCheckForReady)) {
                return roomIdToCheckForReady;
            } else {
                waitForFiveSeconds();
            }
        }
    }

    private void waitForFiveSeconds() {
        try {
            Thread.sleep(5000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
