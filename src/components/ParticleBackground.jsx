import React, { useEffect } from 'react';


if (typeof window !== 'undefined') {
  window.particlesJS = window.particlesJS || {};
}
export function ParticleBackground() {
  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1200
          }
        },
        color: {
          value: ['#3b82f6', '#0ea5e9', '#06b6d4']
        },
        shape: {
          type: ['circle', 'triangle'],
          stroke: {
            width: 1,
            color: '#3b82f6'
          }
        },
        opacity: {
          value: 0.4,
          random: true,
          animation: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 4,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3b82f6',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'bounce',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: ['grab', 'bubble']
          },
          onclick: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          bubble: {
            distance: 200,
            size: 6,
            duration: 0.4,
            opacity: 0.8
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          }
        },
        detect_on: 'window'
      },
      retina_detect: true
    });
  }, []);

  return (
    <div 
      id="particles-js"
      className="fixed inset-0 z-0 min-h-screen w-full"
    />
  );
}