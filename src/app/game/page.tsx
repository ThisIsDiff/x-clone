"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game settings
    const paddleWidth = 15;
    const paddleHeight = 100;
    const paddleMargin = 10;
    const ballRadius = 10;
    const playerColor = "#4CAF50";
    const aiColor = "#F44336";
    const ballColor = "#FFD600";
    const netColor = "#fff";

    let player = {
      x: paddleMargin,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: playerColor,
      dy: 0,
    };

    let ai = {
      x: canvas.width - paddleMargin - paddleWidth,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: aiColor,
      dy: 3,
    };

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: ballRadius,
      speed: 5,
      dx: 5 * (Math.random() > 0.5 ? 1 : -1),
      dy: 3 * (Math.random() > 0.5 ? 1 : -1),
      color: ballColor,
    };

    function drawRect(x: number, y: number, w: number, h: number, color: string) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    function drawCircle(x: number, y: number, r: number, color: string) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawNet() {
      for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, netColor);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNet();
      drawRect(player.x, player.y, player.width, player.height, player.color);
      drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
      drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    function collision(paddle: typeof player, ball: typeof ball) {
      return (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y
      );
    }

    // Mouse control
    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const scaleY = canvas.height / rect.height;
      const mouseY = (e.clientY - rect.top) * scaleY;
      player.y = mouseY - player.height / 2;
      if (player.y < 0) player.y = 0;
      if (player.y + player.height > canvas.height)
        player.y = canvas.height - player.height;
    }
    canvas.addEventListener("mousemove", onMouseMove);

    function moveAI() {
      let aiCenter = ai.y + ai.height / 2;
      if (ball.y < aiCenter - 20) {
        ai.y -= ai.dy;
      } else if (ball.y > aiCenter + 20) {
        ai.y += ai.dy;
      }
      if (ai.y < 0) ai.y = 0;
      if (ai.y + ai.height > canvas.height)
        ai.y = canvas.height - ai.height;
    }

    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = ball.speed * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
    }

    function update() {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
      }

      if (collision(player, ball)) {
        ball.dx = Math.abs(ball.dx);
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);
        let angle = collidePoint * (Math.PI / 4);
        let direction = 1;
        ball.dx = direction * ball.speed * Math.cos(angle);
        ball.dy = ball.speed * Math.sin(angle);
      } else if (collision(ai, ball)) {
        ball.dx = -Math.abs(ball.dx);
        let collidePoint = ball.y - (ai.y + ai.height / 2);
        collidePoint = collidePoint / (ai.height / 2);
        let angle = collidePoint * (Math.PI / 4);
        let direction = -1;
        ball.dx = direction * ball.speed * Math.cos(angle);
        ball.dy = ball.speed * Math.sin(angle);
      }

      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
      }

      moveAI();
    }

    let animationId: number;
    function gameLoop() {
      update();
      draw();
      animationId = requestAnimationFrame(gameLoop);
    }
    gameLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-900 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Simple Pong Game</h1>
      <div className="shadow-lg border-4 border-white rounded-lg">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="bg-black"
        />
      </div>
      <p className="text-gray-300 mt-6">
        Move your mouse up and down to control the left paddle!
      </p>
    </main>
  );
}