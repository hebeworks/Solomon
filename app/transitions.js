// app/transitions.js

export default function () {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('gallery'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('index'),
    this.toRoute('statnotices.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  
  this.transition(
    this.fromRoute('canvas'),
    this.toRoute('gallery'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('canvas'),
    this.toRoute('statnotices.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}