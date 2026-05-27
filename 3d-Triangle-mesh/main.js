var tmax_tl = new TimelineMax({
      delay: 0.25,
      repeat: -1,
      repeatDelay: 0.25,
      yoyo: true
    }),
    svg_shapes  = $('.polylion > polygon'),
    stagger_val = 0.00475,
    duration    = 1.5,

    stagger_opts_from = {
      css: {
        opacity: 0,
        scale: 0,
{
      css: {
        opacity: 1,
        scale: 1
      },
      ease: Elastic.easeInOut
    };

tmax_tl.staggerFromTo(
  svg_shapes,
  duration,
  stagger_opts_from,
  stagger_opts_to,
  stagger_val,
  0
);
