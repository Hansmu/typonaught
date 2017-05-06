package ee.ttu.ui.core;

import ee.ttu.ui.domain.Room;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.domain.json.RandomText;
import ee.ttu.ui.repository.RoomRepository;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class RoomService {

    private RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public String generateNewRoom(String playerOneIdentifier) {
        UUID newRoomId = UUID.randomUUID();
        Room room = new Room(newRoomId.toString(), playerOneIdentifier.toString());
        room.setTypingText(getRandomText());
        roomRepository.save(room);
        return newRoomId.toString();
    }

    private String getRandomText() {
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity(getRequestHeaders());
        RandomText randomText = restTemplate.exchange("http://www.randomtext.me/api/gibberish/p-20/100-100", HttpMethod.GET, httpEntity, new ParameterizedTypeReference<RandomText>() {}).getBody();
        return Jsoup.parse(randomText.getTextOut()).text();
    }

    private Map<String, String> getRequestHeaders() {
        Map<String, String> headers = new HashMap<>();

        headers.put("Content-Type", "application/json;");
        headers.put("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
        headers.put("Access-Control-Allow-Origin", "*");


        return headers;
    }

    public void setRoomPlayerStatusToReady(PlayerReadyJson playerReadyJson) {
        setRoomPlayerReady(playerReadyJson);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void setRoomPlayerReady(PlayerReadyJson playerReadyJson) {
        Room room = roomRepository.findOneByRoomIdentifier(playerReadyJson.getRoomIdentifier());

        if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerOneIdentifier())) {
            room.setPlayerOneReady(!room.getPlayerOneReady());
        } else if (playerReadyJson.getPlayerIdentifier().equals(room.getPlayerTwoIdentifier())) {
            room.setPlayerTwoReady(!room.getPlayerTwoReady());
        }

        roomRepository.save(room);
    }

    public boolean isRoomReady(String roomIdentifier) {
        Room room = roomRepository.findOneByRoomIdentifier(roomIdentifier);
        return room.getPlayerOneReady() && room.getPlayerTwoReady();
    }

    public UUID generatePlayerId() {
        return UUID.randomUUID();
    }
}
