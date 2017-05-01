package ee.ttu.ui.domain.json;

import java.util.UUID;

public class RoomReadyJson {
    private boolean isRoomReady;
    private UUID roomIdentifier;
    private String roomTypingText;

    public boolean isRoomReady() {
        return isRoomReady;
    }

    public void setRoomReady(boolean roomReady) {
        isRoomReady = roomReady;
    }

    public UUID getRoomIdentifier() {
        return roomIdentifier;
    }

    public void setRoomIdentifier(UUID roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }

    public String getRoomTypingText() {
        return roomTypingText;
    }

    public void setRoomTypingText(String roomTypingText) {
        this.roomTypingText = roomTypingText;
    }
}
