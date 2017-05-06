package ee.ttu.ui.domain;

import javax.persistence.*;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@Table(name="room")
public class Room {

    @Id
    @GeneratedValue
    private Long id;
    private String roomIdentifier;
    private String playerOneIdentifier;
    private String playerTwoIdentifier;
    private Boolean playerOneReady;
    private Boolean playerTwoReady;
    private Integer playerOneScore;
    private Integer playerTwoScore;
    private Integer currentWordIndex;

    @Column(name="typing_text")
    @Lob
    private String typingText;

    @Transient
    private String activeWord;

    public Room() {}

    public Room(String roomIdentifier, String playerOneIdentifier) {
        this.roomIdentifier = roomIdentifier;
        this.playerOneIdentifier = playerOneIdentifier;
        this.currentWordIndex = 0;

        this.playerOneReady = true;
        this.playerTwoReady = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomIdentifier() {
        return roomIdentifier;
    }

    public void setRoomIdentifier(String roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }

    public String getPlayerOneIdentifier() {
        return playerOneIdentifier;
    }

    public void setPlayerOneIdentifier(String playerOneIdentifier) {
        this.playerOneIdentifier = playerOneIdentifier;
    }

    public String getPlayerTwoIdentifier() {
        return playerTwoIdentifier;
    }

    public void setPlayerTwoIdentifier(String playerTwoIdentifier) {
        this.playerTwoIdentifier = playerTwoIdentifier;
    }

    public Boolean getPlayerOneReady() {
        return playerOneReady;
    }

    public void setPlayerOneReady(Boolean playerOneReady) {
        this.playerOneReady = playerOneReady;
    }

    public Boolean getPlayerTwoReady() {
        return playerTwoReady;
    }

    public void setPlayerTwoReady(Boolean playerTwoReady) {
        this.playerTwoReady = playerTwoReady;
    }

    public Integer getPlayerOneScore() {
        return playerOneScore;
    }

    public void setPlayerOneScore(Integer playerOneScore) {
        this.playerOneScore = playerOneScore;
    }

    public Integer getPlayerTwoScore() {
        return playerTwoScore;
    }

    public void setPlayerTwoScore(Integer playerTwoScore) {
        this.playerTwoScore = playerTwoScore;
    }

    public String getTypingText() {
        return typingText;
    }

    public void setTypingText(String typingText) {
        this.typingText = typingText;
    }

    public Integer getCurrentWordIndex() {
        return currentWordIndex;
    }

    public void setCurrentWordIndex(Integer currentWordIndex) {
        this.currentWordIndex = currentWordIndex;
    }

    public String getActiveWord() {
        String[] words = typingText.split(" ");

        if (!(playerOneReady && playerTwoReady)) {
            currentWordIndex = ThreadLocalRandom.current().nextInt(0, words.length);
        }

        return words[currentWordIndex];
    }

    public void setActiveWord(String activeWord) {
        this.activeWord = activeWord;
    }
}
