export const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Card layout bounding box passed dynamically from Javascript measurements
uniform vec2 u_card_center;
uniform vec2 u_card_half_size;
uniform float u_card_roundness;

// Custom parameters
uniform float u_beam_width;
uniform float u_beam_glow;
uniform float u_bleed_distortion;
uniform float u_chromatic_offset;
uniform float u_bleed_glow_width;
uniform float u_bleed_falloff;
uniform float u_flow_speed;
uniform float u_fog_density;
uniform int u_perf_low;

uniform float u_attachment_width;
uniform float u_attachment_height;
uniform float u_attachment_power;

// Physical Refraction Fine-tuning Uniforms
uniform float u_red_diffusion;
uniform float u_blue_diffusion;
uniform float u_refract_saturation;

// Effect Activation Toggles
uniform float u_toggle_beam;
uniform float u_toggle_bleed;
uniform float u_toggle_scatter;
uniform float u_toggle_funnel;

// Preset / Customized Colors
uniform vec3 u_col_beam;
uniform vec3 u_col_bleed;
uniform vec3 u_col_scatter;

varying vec2 vUv;

// Pseudo-random noise & FBM generators
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    int octaves = (u_perf_low == 1) ? 2 : 4;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amplitude * noise(p * frequency);
        p += vec2(0.12, 0.17);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Signed Distance Field of rounded box
float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

void main() {
    // Screen UV coordinate normalized relative to viewport aspect ratio
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 mouse_uv = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    // Distance calculations to original card
    vec2 p_card = uv - u_card_center;
    float d_card = sdRoundBox(p_card, u_card_half_size, u_card_roundness);

    // 1. Background atmospheric smoke clouds
    vec2 cloud_uv = uv * 1.3 + vec2(u_time * 0.02, -u_time * 0.015);
    float cloud_noise = fbm(cloud_uv);

    // Standard space background (toggled volumetric scatter on/off)
    vec3 bg_color = mix(vec3(0.002, 0.002, 0.005), vec3(0.015, 0.012, 0.022) * u_fog_density, cloud_noise);

    // Volumetric ambient light scatter mapping (only active when scatter toggle is high)
    float scatter_factor = exp(-abs(uv.x - u_card_center.x) / 0.4) * smoothstep(u_card_center.y - 0.3, u_card_center.y + 0.8, uv.y);
    bg_color += u_col_scatter * scatter_factor * (0.65 + 0.35 * cloud_noise) * u_fog_density * u_toggle_scatter;

    // 2. Volumetric Smoke Distortions for Chromatic Light Leakage (Surrounding Left, Right, & Bottom)
    vec2 distortion = vec2(
        fbm(uv * 4.2 + vec2(0.0, u_time * 0.3)),
        fbm(uv * 4.2 + vec2(u_time * 0.2, 0.0))
    ) * u_bleed_distortion;

    vec2 p_card_distorted = p_card + distortion;

    // Physical dispersion offsets modeling optical wavelength bending index
    vec2 offset_r = u_chromatic_offset * vec2(-1.0, -0.4);
    vec2 offset_g = vec2(0.0, 0.0);
    vec2 offset_b = u_chromatic_offset * vec2(1.0, 0.6);

    float d_r = sdRoundBox(p_card_distorted + offset_r, u_card_half_size, u_card_roundness);
    float d_g = sdRoundBox(p_card_distorted + offset_g, u_card_half_size, u_card_roundness);
    float d_b = sdRoundBox(p_card_distorted + offset_b, u_card_half_size, u_card_roundness);

    // Physical Exponential Attenuation modeling light decay
    float bleed_r = exp(-max(d_r, 0.0) / (u_bleed_glow_width * u_red_diffusion));
    float bleed_g = exp(-max(d_g, 0.0) / u_bleed_glow_width);
    float bleed_b = exp(-max(d_b, 0.0) / (u_bleed_glow_width * u_blue_diffusion));

    // Localized taper to keep top center clean without generating a global shelf line
    float beam_proximity = exp(-abs(p_card.x) * 4.0);
    float top_taper = mix(1.0, smoothstep(u_card_half_size.y + 0.20, u_card_half_size.y - 0.05, p_card.y), beam_proximity);

    // Apply customizable decay gamma curve
    bleed_r = pow(bleed_r, u_bleed_falloff);
    bleed_g = pow(bleed_g, u_bleed_falloff);
    bleed_b = pow(bleed_b, u_bleed_falloff);

    // Eliminate inner card bleed leakage entirely
    float card_outer_mask = smoothstep(0.0, 0.005, d_card);
    bleed_r *= card_outer_mask;
    bleed_g *= card_outer_mask;
    bleed_b *= card_outer_mask;

    // Map spectral bands to configured color channel ratios
    vec3 spectral_bleed = vec3(0.0);
    spectral_bleed.r = bleed_r * u_col_bleed.r * 1.6;
    spectral_bleed.g = bleed_g * (u_col_bleed.g * 0.4 + u_col_bleed.r * 0.2);
    spectral_bleed.b = bleed_b * u_col_bleed.b * 1.9;

    // Apply saturation mixing
    float gray_bleed = (spectral_bleed.r + spectral_bleed.g + spectral_bleed.b) / 3.0;
    spectral_bleed = mix(vec3(gray_bleed), spectral_bleed, u_refract_saturation);

    // Combine with dynamic atmosphere noise
    spectral_bleed *= top_taper * (0.5 + 0.5 * fbm(uv * 4.0 - vec2(0.0, u_time * u_flow_speed * 0.15))) * u_toggle_bleed;

    // 3. Vertical White-Hot Core Laser Beam
    float beam_x_coord = uv.x - u_card_center.x;
    float beam_start_y = u_card_center.y + u_card_half_size.y;
    float beam_y_coord = uv.y - beam_start_y;

    // Interactive mouse pull/bend of the beam coordinates
    float y_diff = uv.y - mouse_uv.y;
    float mouse_pull = (mouse_uv.x - u_card_center.x) * exp(-(y_diff * y_diff) / 0.09) * 0.05;
    beam_x_coord -= mouse_pull;

    float dist_x = abs(beam_x_coord);

    // Exponential base flare interpolation
    float flare_taper = exp(-max(beam_y_coord, 0.0) / max(u_attachment_height, 0.001));
    flare_taper = pow(flare_taper, u_attachment_power);

    float dynamic_width = u_beam_width + (u_attachment_width * flare_taper);

    // Core beam & soft glow falloff
    float core_laser = exp(-dist_x / dynamic_width);
    float halo_glow = exp(-dist_x / (dynamic_width * 8.0)) * u_beam_glow;
    float wide_flare = exp(-dist_x / (0.18 + u_attachment_width * flare_taper)) * 0.12;

    // SMOOTH VERTICAL FADE: Replaced conditional "if" check with continuous smoothstep
    float vertical_fade = smoothstep(-0.12, 0.02, beam_y_coord);
    float height_falloff = smoothstep(1.3, 0.0, beam_y_coord) * vertical_fade;
    float beam_val = (core_laser + halo_glow + wide_flare) * height_falloff;

    // Animate noise ripples within laser core
    float laser_noise = fbm(vec2(beam_x_coord * 5.0, beam_y_coord * 4.0 - u_time * u_flow_speed));
    beam_val *= (0.75 + 0.25 * laser_noise);

    // Apply global activation toggle to vertical beam
    vec3 beam_color = ((u_col_beam * beam_val * 1.3) + (vec3(1.0) * pow(beam_val, 4.0) * 1.6)) * u_toggle_beam;

    // NO STEP FUNCTION: Smooth continuous additive blending across layers
    vec3 scene_behind = bg_color + (spectral_bleed * 1.4) + beam_color;

    // 4. Draw Central Card CTA Box Surface & Border Highlights
    float card_mask = smoothstep(0.001, 0.0, d_card);

    // Slate carbon body surface
    vec3 card_surface = vec3(0.012, 0.012, 0.016);
    card_surface += vec3(0.008, 0.01, 0.018) * (1.0 - p_card.y);

    // Faint reflection specular mapping from vertical laser beam
    float laser_reflection = exp(-abs(p_card.x) / 0.08) * smoothstep(-u_card_half_size.y, u_card_half_size.y, p_card.y) * 0.06;
    card_surface += u_col_beam * laser_reflection * u_toggle_beam;

    // Interactive mouse shine reflection overlay on card
    float mouse_glow = exp(-length(p_card - (mouse_uv - u_card_center)) / 0.16) * 0.04;
    card_surface += vec3(0.6, 0.8, 1.0) * mouse_glow;

    // Crisp inner border
    float border_mask = smoothstep(0.003, 0.0, abs(d_card));
    vec3 default_border_color = vec3(0.08, 0.09, 0.14);

    // Energetic flow/funnel along the top border
    float is_near_top_edge = smoothstep(u_card_half_size.y - 0.08, u_card_half_size.y, p_card.y) * step(abs(p_card.x), u_card_half_size.x);
    float flow_dist = abs(p_card.x);
    float wave_pulse = sin(flow_dist * 24.0 - u_time * u_flow_speed * 1.5) * 0.5 + 0.5;

    float funnel_concentration = exp(-flow_dist / (u_card_half_size.x * 0.22)) * 3.5;
    float corner_fade = smoothstep(u_card_half_size.x, u_card_half_size.x * 0.2, flow_dist);

    float border_glow = border_mask * is_near_top_edge * (wave_pulse * 0.35 + 0.65) * (funnel_concentration + 0.2) * corner_fade;
    vec3 active_border_energy = u_col_beam * border_glow * 1.6 * u_toggle_funnel;

    // Composite final card body + glowing borders
    vec3 composite_card = mix(card_surface, default_border_color, border_mask) + active_border_energy;

    // Final output
    vec3 final_color = mix(scene_behind, composite_card, card_mask);

    // Subtle post-process vignette
    vec2 viewport_uv = gl_FragCoord.xy / u_resolution.xy;
    float vignette = viewport_uv.x * viewport_uv.y * (1.0 - viewport_uv.x) * (1.0 - viewport_uv.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
    final_color *= vignette;

    gl_FragColor = vec4(final_color, 1.0);
}
`;
