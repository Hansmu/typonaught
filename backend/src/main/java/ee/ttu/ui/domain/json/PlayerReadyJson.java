package ee.ttu.ui.domain.json;

import java.util.UUID;

public class PlayerReadyJson {
    private String playerIdentifier;
    private String roomIdentifier;

    public String getPlayerIdentifier() {
        return playerIdentifier;
    }

    public void setPlayerIdentifier(String playerIdentifier) {
        this.playerIdentifier = playerIdentifier;
    }

    public String getRoomIdentifier() {
        return roomIdentifier;
    }

    public void setRoomIdentifier(String roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }
}
