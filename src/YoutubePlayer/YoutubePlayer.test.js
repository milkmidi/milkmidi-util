import { mount } from '@vue/test-utils';
import YoutubePlayerComponent from './vue';


describe('YoutubePlayer.vue', () => {
  it('renders a div with class bar', () => {
    const wrapper = mount(YoutubePlayerComponent);

    expect(wrapper.classes('anteater-youtubeplayer')).toBe(true);
  });
});
