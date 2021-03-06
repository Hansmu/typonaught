package ee.ttu.ui.domain.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WordResult {

    private String roomIdentifier;
    private String userIdentifier;
    private String username;
    private Boolean wordCorrect;
    private Integer timeTaken;

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

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
