<template>
  <div class="container">
    <h1 class="title">Latest Complaints</h1>

    <el-col :span="6" class="sent">
      <h3 class="box-card-title">Sent {{ this.sent.length }}</h3>

      <div
        class="drop-wrapper"
        v-bind:class="{ active: isDragging && selectedArr !== sent }"
      >
        <div
          v-for="(item, index) in sent"
          :key="item.id"
          v-on:mousedown="selectItem(index, item, sent)"
          v-on:mouseup="dropItem(index, sent)"
          v-bind:class="{ dragging: isItemDragging(item) }"
          :id="item.id"
          class="box-card-item-wrapper"
          v-on:click="displayTicket(index, item, sent)"
        >
          <el-card class="box-card item">
            <p class="ticket-id">
              <el-badge>{{ item.complaint_id }}</el-badge>
            </p>

            <p class="description">
              <el-badge>{{ transformToShortText(item.description) }}</el-badge>
            </p>

            <div class="tags" v-if="item.type === 'COMPLAINT'">
              <p class="category">
                <el-badge>{{ item.category }}</el-badge>
              </p>

              <el-button type="warning" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="tags" v-else-if="item.type === 'SUGGESTION'">
              <p class="category">
                <el-badge>{{ item.category }}</el-badge>
              </p>

              <el-button type="success" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="avatar">
              <el-avatar shape="circle" :size="'small'" :src="''"></el-avatar>
            </div>
          </el-card>
        </div>

        <!-- /.box-card (item) -->
        <div
          v-if="isDragging && sent.length < 1"
          v-on:mouseup="dropItem(0, sent)"
          class="box-card-item-wrapper empty"
        >
          <el-card class="box-card item"></el-card>
        </div>
        <!-- /.box-card (empty) -->
      </div>
      <!-- /.drop-wrapper -->
    </el-col>

    <!----------------------------------------------------------->

    <el-col :span="6" class="reviewed">
      <h3 class="box-card-title">REVIEWED {{ this.reviewed.length }}</h3>

      <div
        class="drop-wrapper"
        v-bind:class="{ active: isDragging && selectedArr !== reviewed }"
      >
        <div
          v-for="(item, index) in reviewed"
          :key="item.id"
          v-on:mousedown="selectItem(index, item, reviewed)"
          v-on:mouseup="dropItem(index, reviewed)"
          v-bind:class="{ dragging: isItemDragging(item) }"
          :id="item.id"
          class="box-card-item-wrapper"
          v-on:click="displayTicket(index, item, reviewed)"
        >
          <el-card class="box-card item">
            <p class="ticket-id">
              <el-badge>{{ transformToShortText(item.complaint_id) }}</el-badge>
            </p>

            <p class="description">
              <el-badge>{{ transformToShortText(item.description) }}</el-badge>
            </p>

            <div class="tags" v-if="item.type === 'COMPLAINT'">
              <p>
                <el-badge class="category">{{ item.category }}</el-badge>
              </p>

              <el-button type="warning" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="tags" v-else-if="item.type === 'SUGGESTION'">
              <el-button type="success" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="avatar">
              <el-avatar shape="circle" :size="'small'" :src="''"></el-avatar>
            </div>
          </el-card>
        </div>
        <!-- /.box-card (item) -->
        <div
          v-if="isDragging && reviewed.length < 1"
          v-on:mouseup="dropItem(0, reviewed)"
          class="box-card-item-wrapper empty"
        >
          <el-card class="box-card item"></el-card>
        </div>
        <!-- /.box-card (empty) -->
      </div>
      <!-- /.drop-wrapper -->
    </el-col>

    <!----------------------------------------------------------->

    <el-col :span="6" class="inprogress">
      <h3 class="box-card-title">IN PROGRESS {{ this.inprogress.length }}</h3>

      <div
        class="drop-wrapper"
        v-bind:class="{ active: isDragging && selectedArr !== inprogress }"
      >
        <div
          v-for="(item, index) in inprogress"
          :key="item.id"
          v-on:mousedown="selectItem(index, item, inprogress)"
          v-on:mouseup="dropItem(index, inprogress)"
          v-bind:class="{ dragging: isItemDragging(item) }"
          :id="item.id"
          class="box-card-item-wrapper"
          v-on:click="displayTicket(index, item, inprogress)"
        >
          <el-card class="box-card item">
            <p class="ticket-id">
              <el-badge>{{ transformToShortText(item.complaint_id) }}</el-badge>
            </p>

            <p class="description">
              <el-badge>{{ transformToShortText(item.description) }}</el-badge>
            </p>

            <div class="tags" v-if="item.type === 'COMPLAINT'">
              <p class="category">
                <el-badge>{{ item.category }}</el-badge>
              </p>

              <el-button type="warning" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="tags" v-else-if="item.type === 'SUGGESTION'">
              <el-button type="success" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="avatar">
              <el-avatar shape="circle" :size="'small'" :src="''"></el-avatar>
            </div>
          </el-card>
        </div>
        <!-- /.box-card (item) -->
        <div
          v-if="isDragging && inprogress.length < 1"
          v-on:mouseup="dropItem(0, inprogress)"
          class="box-card-item-wrapper empty"
        >
          <el-card class="box-card item"></el-card>
        </div>
        <!-- /.box-card (empty) -->
      </div>
      <!-- /.drop-wrapper -->
    </el-col>

    <!----------------------------------------------------------->

    <el-col :span="6" class="done">
      <h3 class="box-card-title">DONE {{ this.done.length }}</h3>

      <div
        class="drop-wrapper"
        v-bind:class="{ active: isDragging && selectedArr !== done }"
      >
        <div
          v-for="(item, index) in done"
          :key="item.id"
          v-on:mousedown="selectItem(index, item, done)"
          v-on:mouseup="dropItem(index, done)"
          v-bind:class="{ dragging: isItemDragging(item) }"
          :id="item.id"
          class="box-card-item-wrapper"
          v-on:click="displayTicket(index, item, done)"
        >
          <el-card class="box-card item">
            <p class="ticket-id">
              <el-badge>{{ transformToShortText(item.complaint_id) }}</el-badge>
            </p>

            <p class="description">
              <el-badge>{{ transformToShortText(item.description) }}</el-badge>
            </p>

            <div class="tags" v-if="item.type === 'COMPLAINT'">
              <p class="category">
                <el-badge>{{ item.category }}</el-badge>
              </p>

              <el-button type="warning" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="tags" v-else-if="item.type === 'SUGGESTION'">
              <el-button type="success" size="mini" round>
                {{ item.type }}
              </el-button>
            </div>

            <div class="avatar">
              <el-avatar shape="circle" :size="'small'" :src="''"></el-avatar>
            </div>
          </el-card>
        </div>
        <!-- /.box-card (item) -->
        <div
          v-if="isDragging && done.length < 1"
          v-on:mouseup="dropItem(0, done)"
          class="box-card-item-wrapper empty"
        >
          <el-card class="box-card item"></el-card>
        </div>
        <!-- /.box-card (empty) -->
      </div>
      <!-- /.drop-wrapper -->
    </el-col>

    <!----------------------------------------------------------->

    <el-dialog
      :title="'Add new item to ' + addPopupTitle"
      :visible.sync="showAddingPopup"
      width="40%"
    >
      <div>
        <el-input placeholder="Name" v-model="inputItemName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddingPopup = false">Cancel</el-button>
        <el-button type="primary" @click="addItem(addPopupTitle)"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <!----------------------------------------------------------->

    <el-dialog
      :title="'Update ticket'"
      :visible.sync="showUpdatePopup"
      width="50%"
      class="updateTicket"
    >
      <div>
        <div class="ticketType">
          <el-button type="warning" size="mini" round>
            {{ this.type }}
          </el-button>

          <p class="ticketId">{{ this.complaint_id }}</p>
        </div>

        <div class="rightSide">
          <div class="ticketAssignTo">
            <p>Assign to</p>

            <select
              name="category_id"
              @change="changeAssignTo($event)"
              v-model="assignTo"
            >
              <option value disabled>Unassigned</option>
              <option
                v-for="item in thirdPartyList"
                v-bind:key="item.name"
                :value="item.name"
                >{{ item.name }}</option
              >
            </select>
          </div>

          <div class="ticketPriority">
            <p>Priority</p>

            <select
              name="category_id"
              @change="changePriority($event)"
              v-model="priority"
            >
              <option value disabled>Select priority</option>
              <option
                v-for="item in priorityList"
                v-bind:key="item"
                :value="item"
                >{{ item }}</option
              >
            </select>
          </div>

          <div class="ticketDeadline">
            <p>Deadline</p>
            <el-input placeholder="Write a date" v-model="deadline"></el-input>
          </div>
        </div>

        <div class="ticketCategory">
          <p>Category</p>

          <select
            split-button
            name="category_id"
            @change="changeCategory($event)"
            v-model="category"
          >
            <option value disabled>Select category</option>
            <option v-for="item in categories" v-bind:key="item">{{
              item
            }}</option>
          </select>
        </div>

        <div class="ticketLocation">
          <h1>Location</h1>
          <p>{{ this.location }}</p>
        </div>

        <div class="ticketDescription">
          <h1>Description</h1>
          <p>{{ this.description }}</p>
        </div>

        <div class="ticketStatus">
          <p>Status</p>

          <select split-button @change="changeStatus($event)" v-model="status">
            <option v-for="item in statusList" v-bind:key="item">{{
              item
            }}</option>
          </select>
        </div>

        <div class="ticketFeedback">
          <p>Feedback</p>

          <textarea
            placeholder="Write a feedback"
            v-model="feedback"
          ></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpdatePopup = false">Cancel</el-button>
        <el-button type="primary" @click="updateTicket()">Update</el-button>
      </span>
    </el-dialog>

    <!----------------------------------------------------------->
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "BoardPage",
  methods: {
    selectItem(index, item, arr) {
      if (this.debug) console.log("selectItem - Board Page");

      this.selectedIndex = index;
      this.selectedItem = item;
      this.selectedArr = arr;

      const selectedHtmlElOrig = document.querySelector("#" + item.id);
      this.selectedHtmlEl = selectedHtmlElOrig.cloneNode(true);
      this.selectedHtmlEl.style.width = selectedHtmlElOrig.clientWidth + "px";
      this.selectedHtmlEl.style.position = "fixed";

      const selectedHtmlClass = document.querySelectorAll(
        "[class^=drop-wrapper]"
      );

      this.oldSentArrayLength = selectedHtmlClass[0].childElementCount;
      this.oldReviewedArrayLength = selectedHtmlClass[1].childElementCount;
      this.oldInProgressArrayLength = selectedHtmlClass[2].childElementCount;
      this.oldDoneArrayLength = selectedHtmlClass[3].childElementCount;

      document.body.appendChild(this.selectedHtmlEl);

      this.isMouseDown = true;
    },

    dragItem(event) {
      if (!this.isDragging) return;
      if (this.debug) console.log("dragItem - Board Page");
      if (this.selectedHtmlEl) {
        const x = event.x - this.selectedHtmlEl.clientWidth / 2;
        const y = event.y - this.selectedHtmlEl.clientHeight - 5;
        this.selectedHtmlEl.style.top = y + "px";
        this.selectedHtmlEl.style.left = x + "px";
      }
    },

    dropItem(index, arr) {
      if (!this.isDragging) return;

      this.deleteItem(this.selectedIndex, this.selectedArr);

      if (this.debug) console.log("dropItem - Board Page");

      arr.splice(index, 0, this.selectedItem);

      this.isMouseDown = false;

      if (this.done.length > this.oldDoneArrayLength) {
        console.log("UPDATE DONE");
        this.updateStatus("DONE");
      } else if (this.inprogress.length > this.oldInProgressArrayLength) {
        console.log("UPDATE IN PROGRESS");
        this.updateStatus("IN PROGRESS");
      } else if (this.reviewed.length > this.oldReviewedArrayLength) {
        console.log("UPDATE REVIEWED");
        this.updateStatus("REVIEWED");
      } else if (this.sent.length > this.oldSentArrayLength) {
        console.log("UPDATE SENT");
        this.updateStatus("SENT");
      }
    },

    deleteItem(index, arr) {
      if (this.debug) console.log("deleteItem - Board Page");
      arr.splice(index, 1);
    },

    isItemDragging(item) {
      if (
        this.isDragging &&
        this.selectedItem &&
        item.id === this.selectedItem.id
      )
        return true;

      return false;
    },

    addItem(type) {
      if (!this.inputItemName) return;
      if (this.debug) console.log("addItem - Board Page");
      this.showAddingPopup = false;
      const item = {
        name: this.inputItemName,
        id: "",
      };

      switch (type) {
        case "Sent":
          item.id = type + this.sent.length;
          this.sent.push(item);
          break;
        case "Reviewed":
          item.id = type + this.reviewed.length;
          this.reviewed.push(item);
          break;
        case "InProgress":
          item.id = type + this.projects.length;
          this.inprogress.push(item);
          break;
        case "Done":
          item.id = type + this.tools.length;
          this.done.push(item);
          break;
      }

      this.inputItemName = "";
    },

    transformToShortText(text) {
      if (text.length > 100) return text.substring(0, 100) + "...";
      else return text;
    },

    // eslint-disable-next-line
    displayTicket(index, item, arr) {
      this.showUpdatePopup = true;

      this.id = item.id;
      this.complaint_id = item.complaint_id;
      this.category = item.category;
      this.description = item.description;
      this.status = item.status;
      this.feedback = item.feedback;
      this.location = item.location;
      this.type = item.type;
      this.assignTo = item.assignTo;
      this.priority = item.priority;
      this.deadline = item.deadline;
    },

    updateTicket() {
      db.collection("complaints")
        .doc(this.id)
        .update({
          assignTo: this.assignTo,
          priority: this.priority,
          deadline: this.deadline,
          category: this.category,
          status: this.status,
          feedback: this.feedback,
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      this.showUpdatePopup = false;

      this.fetchData();
    },

    updateStatus(value) {
      db.collection("complaints")
        .doc(this.selectedItem.id)
        .update({
          status: value,
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },

    fetchData() {
      this.sent = [];
      this.reviewed = [];
      this.inprogress = [];
      this.done = [];

      db.collection("complaints")
        .where("status", "==", "SENT")
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              complaint_id: doc.data().id,
              category: doc.data().category,
              feedback: doc.data().feedback,
              status: doc.data().status,
              type: doc.data().type,
              description: doc.data().description,
              timestamp: doc.data().timestamp,
              location: doc.data().location,
              assignTo: doc.data().assignTo,
              priority: doc.data().priority,
              deadline: doc.data().deadline,
            };
            this.sent.push(data);
          });
        });

      db.collection("complaints")
        .where("status", "==", "REVIEWED")
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              complaint_id: doc.data().id,
              category: doc.data().category,
              feedback: doc.data().feedback,
              status: doc.data().status,
              type: doc.data().type,
              description: doc.data().description,
              timestamp: doc.data().timestamp,
              location: doc.data().location,
              assignTo: doc.data().assignTo,
              priority: doc.data().priority,
              deadline: doc.data().deadline,
            };
            this.reviewed.push(data);
          });
        });

      db.collection("complaints")
        .where("status", "==", "IN PROGRESS")
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              complaint_id: doc.data().id,
              category: doc.data().category,
              feedback: doc.data().feedback,
              status: doc.data().status,
              type: doc.data().type,
              description: doc.data().description,
              timestamp: doc.data().timestamp,
              location: doc.data().location,
              assignTo: doc.data().assignTo,
              priority: doc.data().priority,
              deadline: doc.data().deadline,
            };
            this.inprogress.push(data);
          });
        });

      db.collection("complaints")
        .where("status", "==", "DONE")
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              complaint_id: doc.data().id,
              category: doc.data().category,
              feedback: doc.data().feedback,
              status: doc.data().status,
              type: doc.data().type,
              description: doc.data().description,
              timestamp: doc.data().timestamp,
              location: doc.data().location,
              assignTo: doc.data().assignTo,
              priority: doc.data().priority,
              deadline: doc.data().deadline,
            };
            this.done.push(data);
          });
        });
    },

    changeCategory(event) {
      this.category = event.target.value;
    },

    changeStatus(event) {
      this.status = event.target.value;
    },

    changeAssignTo(event) {
      this.assignTo = event.target.value;
    },

    changePriority(event) {
      this.priority = event.target.value;
    },
  },

  created() {
    let showMouseMove = false;
    window.addEventListener("mousemove", (event) => {
      if (this.debug && showMouseMove) console.log("mouseMove - Board Page");
      if (this.isMouseDown) this.isDragging = true;
      else this.isDragging = false;
      this.dragItem(event);
    });
    window.addEventListener("mouseup", () => {
      if (this.debug) console.log("mouseUp - Board Page");
      if (this.selectedHtmlEl && this.selectedHtmlEl.parentNode)
        this.selectedHtmlEl.parentNode.removeChild(this.selectedHtmlEl);
      this.isMouseDown = false;
    });
    this.fetchData();
  },

  data() {
    return {
      debug: true,

      isMouseDown: false,
      isDragging: false,

      selectedIndex: null,
      selectedItem: null,
      selectedHtmlEl: null,
      selectedArr: null,

      sent: [],
      reviewed: [],
      inprogress: [],
      done: [],

      showAddingPopup: false,
      showUpdatePopup: false,
      addPopupTitle: "",
      inputItemName: "",

      id: "",
      complaint_id: "",
      status: "",
      category: "",
      description: "",
      feedback: "",
      type: "",
      location: "",
      priority: "",
      assignTo: "",
      deadline: "",

      oldSentArrayLength: null,
      oldReviewedArrayLength: null,
      oldInProgressArrayLength: null,
      oldDoneArrayLength: null,

      newSentArrayLength: null,
      newReviewedArrayLength: null,
      newInProgressArrayLength: null,
      newDoneArrayLength: null,

      categories: [
        "Airport",
        "Bike lane",
        "Bridge",
        "Bus",
        "Canal",
        "Field",
        "Park",
        "Parking Area",
        "Port",
        "Road",
        "Sidewalk",
        "Traffic sign",
        "Train",
        "Tram",
        "Tunnel",
        "Waterway",
        "Other",
      ],

      statusList: ["SENT", "REVIEWED", "IN PROGRESS", "DONE"],

      thirdPartyList: [
        {
          name: "Julia Rakowiecka",
          image:
            "https://assets.dryicons.com/uploads/icon/svg/5632/0e5980e9-9549-4690-96be-57c04c9477b4.svg",
        },
        {
          name: "Ikhsan Habibi",
          image:
            "https://assets.dryicons.com/uploads/icon/svg/5582/e348412b-7b94-409b-9a9e-6884632dccde.svg",
        },
        {
          name: "Max Musterman",
          image:
            "https://assets.dryicons.com/uploads/icon/svg/5579/0f02d8b8-1178-4c83-a3ff-2ec291c76f73.svg",
        },
      ],

      priorityList: ["HIGH", "MEDIUM", "LOW"],
    };
  },
};
</script>

<style lang="scss" scoped>

.title
{
  color: rgb(70,155,91);
}
textarea {
  width: 470px;
  height: 150px;
}

.rightSide {
  text-transform: uppercase;
  color: rgb(94, 108, 132);
  font-size: 12.5px;
  margin: 20px;
  line-height: 1.5;
  float: right;
  width: 25%;
}

.ticketPriority,
.ticketAssignTo {
  margin-bottom: 20px;
}

.ticketPriority > select {
  width: 127px;
}

.ticketCategory,
.ticketStatus,
.ticketFeedback {
  text-transform: uppercase;
  color: rgb(94, 108, 132);
  font-size: 12.5px;
  margin: 20px;
  line-height: 1.5;
}

.ticketLocation {
  margin-bottom: 20px;
}

.ticketLocation > h1 {
  font-size: 12.5px;
  margin-left: 20px;
  color: rgb(94, 108, 132);
  line-height: 1.5;
  text-transform: uppercase;
}

.ticketLocation > p {
  font-size: 12.5px;
  margin-left: 20px;
  color: rgb(94, 108, 132);
  line-height: 1.5;
}

.ticketDescription > h1 {
  text-transform: uppercase;
  font-size: 12.5px;
  margin-left: 20px;
  color: rgb(94, 108, 132);
  line-height: 1.5;
}
.ticketDescription > p {
  font-size: 12.5px;
  margin-left: 20px;
  color: rgb(94, 108, 132);
  line-height: 1.5;
  width: 60%;
  text-align: justify;
}

.updateTicket {
  font-weight: bold;
}

.ticketType {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
}

.ticketId {
  font-weight: bold;
  font-size: 14px;
  margin-right: 20px;
}

.sent,
.reviewed,
.inprogress,
.done {
  padding: 15px;
  background-color: rgb(244, 245, 247);
  margin: 3px;
  width: 24%;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.box-card-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.overflow-wrapper {
  overflow-y: auto;
  max-height: calc(100vh - 170px);
  padding: 15px 15px 15px;
  margin: 10px -15px 0px;
}

.drop-wrapper {
  border-radius: 4px;
  cursor: move;
  margin-right: 5px;

  &.active {
    border: 2px dashed #469b5b;

    &:hover {
      border-color: #67c23a;
    }
  }
}

.box-card {
  &.header {
    margin-top: 5px;
    text-align: center;
    max-height: 56px;

    button {
      font-size: 25px;
      padding: 7px;
      margin-top: -13px;
    }
  }

  &.item {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .name .el-badge {
      display: block;
    }

    .ticket-id {
      float: right;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .avatar {
      float: right;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .tags {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      button {
        padding: 3px 7px;
        font-size: 11px;
      }

      i {
        float: right;
        font-size: 21px;
        margin-top: -1px;
        margin-right: -10px;
        color: #c0c4cc;
      }
    }
  }
}

.box-card-item-wrapper {
  cursor: move;

  &:not(:first-child) {
    padding-top: 10px;
  }

  &.dragging {
    opacity: 0.5;
  }

  &.empty {
    .el-card {
      min-height: 125px;
      background-color: rgba(#469b5b, 0.2);
    }

    &:hover {
      .el-card {
        background-color: rgba(#67c23a, 0.2);
      }
    }
  }
}
</style>
