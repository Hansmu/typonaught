package ee.ttu.ui.api;

import ee.ttu.ui.core.RoomService;
import ee.ttu.ui.domain.common.Result;
import ee.ttu.ui.domain.json.PlayerReadyJson;
import ee.ttu.ui.domain.json.RoomCreateJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("room")
@CrossOrigin
public class RoomController {

    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("rooms")
    public Result getUnreadyRooms() {
        return Result.ok(roomService.getAllRooms());
    }

    @RequestMapping(value = "generate-player-id", method = RequestMethod.GET)
    public Result generatePlayerId() {
        return Result.ok(roomService.generatePlayerId());
    }

    @RequestMapping(value = "start-room", method = RequestMethod.POST)
    public Result generateRoom(@RequestBody RoomCreateJson roomCreateJson) {
        return Result.ok(roomService.generateNewRoom(roomCreateJson));
    }

    @RequestMapping(value = "player-ready", method = RequestMethod.POST)
    public Result setPlayerReady(@RequestBody PlayerReadyJson playerReadyJson) {
        roomService.setRoomPlayerStatusToReady(playerReadyJson);
        return Result.ok();
    }

    @RequestMapping(value = "ready-wait", method = RequestMethod.GET)
    public Result queryForRoomReady(@RequestParam("room-id") String roomIdentifier) {
        return Result.ok(roomService.isRoomReady(roomIdentifier));
    }
}
