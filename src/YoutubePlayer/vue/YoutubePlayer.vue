<script>
// @flow
// eslint-disable-next-line
import YoutubePlayer, { fetchScript } from 'ml.anteater/YoutubePlayer';

export default {
  name: 'anteater-youtubeplayer',
  player: null,
  props: {
    id: String,
    width: {
      type: Number,
      default: 640,
    },
    height: {
      type: Number,
      default: 390,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      domID: `player-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    };
  },
  watch: {
    id(val) {
      if (this.player) {
        this.player.cueVideoById(val);
        this.player.playVideo();
      }
    },
  },
  methods: {
    createPlayer() {
      this.destroyPlayer();
      const opt = {
        ...this.options,
        autoplay: this.autoplay ? 1 : 0,
        loop: this.loop ? 1 : 0,
      };
      const player = new YoutubePlayer(this.domID, this.id, this.width, this.height, opt);
      player.on(YoutubePlayer.ON_STATE_CHANGE, stateCode => this.$emit('stateChange', stateCode));
      player.on(YoutubePlayer.ON_PROGRESS, progress => this.$emit('videoProgress', progress));
      return player;
    },
    destroyPlayer() {
      if (this.player) {
        this.player.destroy();
        this.player = null;
        delete this.player;
      }
    },
    getPlayer() {
      if (this.player) {
        return this.player.getPlayer();
      }
      return null;
    },
  },
  mounted() {
    fetchScript().then(() => {
      this.player = this.createPlayer();
    });
  },
  beforeDestroy() {
    this.destroyPlayer();
  },
};
</script>

<template lang="pug">
.anteater-youtubeplayer
  div(:id="domID")
</template>
