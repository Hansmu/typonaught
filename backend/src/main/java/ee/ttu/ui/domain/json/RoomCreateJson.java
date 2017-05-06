package ee.ttu.ui.domain.json;

public class RoomCreateJson {

    private String playerIdentifier;
    private String typingText;

    public String getPlayerIdentifier() {
        return playerIdentifier;
    }

    public void setPlayerIdentifier(String playerIdentifier) {
        this.playerIdentifier = playerIdentifier;
    }

    public String getTypingText() {
        return typingText;
    }

    public void setTypingText(String typingText) {
        this.typingText = typingText;
    }
}
