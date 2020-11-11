const templates = (days, hours, mins, secs) =>
  `<div class="timer" id="timer-1">
<span class="value status">${status}</span>
<span class="value status"></span>
<hr />
<div class="field">
  <span class="value days">${days}</span>
  <span class="label">Days</span>
</div>

<div class="field">
  <span class="value hours">${hours}</span>
  <span class="label">Hours</span>
</div>

<div class="field">
  <span class="value  mins">${mins}</span>
  <span class="label">Minutes</span>
</div>

<div class="field">
  <span class="value secs">${secs}</span>
  <span class="label">Seconds</span>
</div>
</div>
</div>
<hr />
<button class="timer start ">Start</button>
<button class="timer stop" disabled>Stop</button>
</div>
`;
export default function Timer({ selector, targetDate }) {
  this.days = pad(
    Math.floor(
      (-Date.parse(new Date()) + Date.parse(targetDate)) /
        (1000 * 60 * 60 * 24),
    ),
  );
  this.hours = pad(
    Math.floor(
      ((-Date.parse(new Date()) + Date.parse(targetDate)) %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60),
    ),
  );
  this.mins = pad(
    Math.floor(
      ((-Date.parse(new Date()) + Date.parse(targetDate)) % (1000 * 60 * 60)) /
        (1000 * 60),
    ),
  );
  this.secs = pad(
    Math.floor(
      ((-Date.parse(new Date()) + Date.parse(targetDate)) % (1000 * 60)) / 1000,
    ),
  );
  this.id = undefined;

  document
    .querySelector(selector)
    .insertAdjacentHTML(
      'beforeend',
      templates(this.days, this.hours, this.mins, this.secs),
    );

  const ref = {
    status: document.querySelector(`${selector} .status`),
    stop: document.querySelector(`${selector} .stop`),
    start: document.querySelector(`${selector} .start`),
    secs: document.querySelector(`${selector} .secs`),
    mins: document.querySelector(`${selector} .mins`),
    hours: document.querySelector(`${selector} .hours`),
    days: document.querySelector(`${selector} .days`),
  };

  this.hendelStop = () => {
    clearInterval(this.id);
    this.id = 0;
    ref.status.textContent = 'Pause';
    ref.stop.setAttribute('disabled', true);
    ref.start.removeAttribute('disabled');
  };

  this.hendeldStart = () => {
    if (this.id) {
      return;
    }

    this.id = setInterval(() => {
      ref.status.textContent = 'timer in progress...';

      const deltaTime = Date.parse(targetDate) - Date.parse(new Date());
      const { days, hours, mins, secs } = getTimeComponemts(deltaTime);
      updateTimer({ days, hours, mins, secs });
      //   ref.days.textContent=days
      //   ref.hours.textContent=hours
      //   ref.mins.textContent=mins
      //   ref.secs.textContent=secs
      if (deltaTime < 0) {
        clearInterval(this.id);
        ref.status.textContent = 'End';
      }
    }, 1000);

    ref.start.setAttribute('disabled', true);
    ref.stop.removeAttribute('disabled');
  };
  ref.stop.addEventListener('click', this.hendelStop);
  ref.start.addEventListener('click', this.hendeldStart);

  function updateTimer({ days, hours, mins, secs }) {
    ref.days.textContent = `${days} `;
    ref.hours.textContent = `${hours}`;
    ref.mins.textContent = `${mins}`;
    ref.secs.textContent = `${secs}`;
  }
}

function getTimeComponemts(deltaTime) {
  const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
