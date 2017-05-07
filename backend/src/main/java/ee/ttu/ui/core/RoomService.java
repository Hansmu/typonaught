package ee.ttu.ui.core;

import ee.ttu.ui.domain.GameMatch;
import ee.ttu.ui.domain.HighScore;
import ee.ttu.ui.domain.Room;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.domain.json.RoomCreateJson;
import ee.ttu.ui.domain.json.VictoryJson;
import ee.ttu.ui.domain.json.WordResult;
import ee.ttu.ui.repository.GameMatchRepository;
import ee.ttu.ui.repository.HighScoreRepository;
import ee.ttu.ui.repository.RoomRepository;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private RoomRepository roomRepository;
    private GameMatchRepository gameMatchRepository;
    private HighScoreRepository highScoreRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, GameMatchRepository gameMatchRepository, HighScoreRepository highScoreRepository) {
        this.roomRepository = roomRepository;
        this.gameMatchRepository = gameMatchRepository;
        this.highScoreRepository = highScoreRepository;
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
        boolean isPlayerOne = room.getPlayerOneIdentifier().equals(playerReadyJson.getPlayerIdentifier());

        if (isPlayerOne) {
            room.setPlayerOneReady(true);
        } else {
            if (room.getPlayerTwoIdentifier() == null) {
                room.setPlayerTwoIdentifier(playerReadyJson.getPlayerIdentifier());
            }
            room.setPlayerTwoReady(true);
        }

        roomRepository.save(room);
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
    public VictoryJson determineWinner(WordResult wordResult) {
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

        boolean isPlayerOneWinner = (room.getPlayerTwoScore() == null || room.getPlayerTwoScore().equals(0)) && wordResult.isWordCorrect();
        boolean isPlayerTwoWinner = (room.getPlayerOneScore() == null || room.getPlayerOneScore().equals(0)) && wordResult.isWordCorrect();

        if (isPlayerOneWinner) {
            Integer currentScore = room.getPlayerOneVictories();
            currentScore++;
            room.setPlayerOneVictories(currentScore);

            addToHighScore(wordResult.getUserIdentifier());
        } else if (isPlayerTwoWinner) {
            Integer currentScore = room.getPlayerTwoVictories();
            currentScore++;
            room.setPlayerTwoVictories(currentScore);

            addToHighScore(wordResult.getUserIdentifier());
        }

        saveMatchResult(isPlayerOne, room, isPlayerOneWinner, wordResult, isPlayerTwoWinner);

        boolean isFirst = isPlayerOne ? isPlayerOneWinner : isPlayerTwoWinner;

        if (room.getPlayerOneScore() != null && room.getPlayerTwoScore() != null) {
            String[] words = room.getTypingText().split(" ");
            room.setCurrentWordIndex(ThreadLocalRandom.current().nextInt(0, words.length));

            room.setPlayerOneScore(null);
            room.setPlayerTwoScore(null);

            room.setPlayerOneReady(false);
            room.setPlayerTwoReady(false);
        }

        roomRepository.save(room);
        List<GameMatch> gameMatches = gameMatchRepository.findAllGameMatchResultsByRoomIdentifier(roomIdentifier).stream()
                .filter(gameMatch -> gameMatch.getPlayerIdentifier().equals(userIdentifier))
                .collect(Collectors.toList());

        return new VictoryJson(isFirst, gameMatches);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void saveMatchResult(boolean isPlayerOne, Room room, boolean isPlayerOneWinner, WordResult wordResult, boolean isPlayerTwoWinner) {
        if (isPlayerOne) {
            gameMatchRepository.save(new GameMatch(room.getPlayerOneIdentifier(), room.getRoomIdentifier(), room.getActiveWord(), isPlayerOneWinner, wordResult.getTimeTaken()));
        } else {
            gameMatchRepository.save(new GameMatch(room.getPlayerTwoIdentifier(), room.getRoomIdentifier(), room.getActiveWord(), isPlayerTwoWinner, wordResult.getTimeTaken()));
        }
    }

    private void addToHighScore(String playerIdentifier) {
        HighScore highScore = highScoreRepository.findOneByPlayerIdentifier(playerIdentifier);
        if (highScore == null) {
            HighScore newHighScore = new HighScore(playerIdentifier);
            newHighScore.setVictories(1);

            highScoreRepository.save(newHighScore);
        } else {
            Integer victories = highScore.getVictories();
            victories++;
            highScore.setVictories(victories);

            highScoreRepository.save(highScore);
        }
    }

    public List<HighScore> getAllHighScores() {
        return highScoreRepository.findAll();
    }

    public List<GameMatch> getRoomScores(String roomIdentifier) {
        return gameMatchRepository.findAllGameMatchResultsByRoomIdentifier(roomIdentifier);
    }
}
