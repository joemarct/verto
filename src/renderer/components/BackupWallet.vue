<template>
  <section>
    <div class="hero-head p-md save-your-keys">
      <p class="is-size-4 font-gibson-semibold">
        Backup Wallet
      </p>
      <a @click="isInstructionsActive = true" class="button m-t-md green is-centered has-text-white">
        <p class="is-size-6">
          Instructions
        </p>
      </a>
      <br>
      <a @click="backupVerto" class="button m-t-md green is-centered has-text-white">
        <p class="is-size-6">
          Backup Verto
        </p>
      </a>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                Backup
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  TODO
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
      isInstructionsActive: false,
      directoryPath: ""
    };
  },
  mounted() {
  },
  methods: {
    backupVerto: function() {
      const { dialog } = require("electron").remote;
      const dateFormat = require('dateformat');
      const selectedPath = dialog.showOpenDialog({
        title: "Choose file",
        properties: ['openDirectory']
      });
      const savePath = selectedPath + '/verto.' + dateFormat(new Date(), "yyyy.mm.dd.h.MM.ss") + '.config';
      const fs = require("fs");
      const path = require("path")
      const electron = require("electron")
      const filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      fs.writeFileSync(savePath, fs.readFileSync(filePath, 'utf-8'));
      this.$router.push({ path: "settings" })
    }
  }
};
</script>

<style scoped>
.display-keys {
  background-color: #162929;
  border-radius: 0.6rem;
  padding: 1rem !important;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.generated-keys {
  background-color: #1a4a48;
  border-radius: 0.6rem;
  border: solid #3acce1 1.2pt;
  overflow-wrap: break-word;
}
.hero-body.save-your-keys {
  background-color: #f7f7fa !important;
  padding-top: 0.3rem !important;
}
.hero-head.save-your-keys {
  background-color: #f7f7fa !important;
}
.save-your-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-your-keys p.font-gibson-semibold.second {
  color: #ffffff;
}
.hero-body.save-your-keys .button.green {
  background-color: #00a6a6 !important;
}
.hero-body.save-your-keys .button.aqua {
  background-color: #2cfee6 !important;
}
.hero-body.save-your-keys .font-gibson {
  color: #78849e;
  font-size: 10.5pt;
}
.hero-body.save-your-keys .button {
  border-radius: 0.7rem;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.level-left .button {
  width: 10rem;
  height: 3rem;
}
.level-right .button {
  width: 10rem;
  height: 3rem;
}
.container {
  width: 10rem;
}
</style>
