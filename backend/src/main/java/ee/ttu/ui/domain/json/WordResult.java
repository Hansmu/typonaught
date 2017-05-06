package ee.ttu.ui.domain.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WordResult {

    private String roomIdentifier;
    private String userIdentifier;
    private Boolean wordCorrect;

    public String getRoomIdentifier() {
        return roomIdentifier;
    }

    public void setRoomIdentifier(String roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }

    public String getUserIdentifier() {
        return userIdentifier;
    }

    public void setUserIdentifier(String userIdentifier) {
        this.userIdentifier = userIdentifier;
    }

    @JsonProperty("isWordCorrect")
    public Boolean isWordCorrect() {
        return wordCorrect;
    }

    public void setWordCorrect(Boolean wordCorrect) {
        this.wordCorrect = wordCorrect;
    }
}
