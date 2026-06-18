import { Body, Controller, HttpCode, Post } from '@nestjs/common';

interface AuditPayload {
  event: string;
  timestamp: string;
  tool: string;
  success: boolean;
  duration_ms: number;
  error: string | null;
  args: unknown;
}

@Controller('audit')
export class AuditController {
  @Post()
  @HttpCode(200)
  receive(@Body() payload: AuditPayload) {
    const status = payload.success ? '✅' : '❌';
    const ms = payload.duration_ms ?? '-';
    const time = payload.timestamp ?? new Date().toISOString();

    const lines = [
      `─── tool call ──────────────────────────────`,
      `  ${status}  ${payload.tool}`,
      `  time     : ${time}`,
      `  duration : ${ms}ms`,
    ];
    if (payload.error) lines.push(`  error    : ${payload.error}`);
    if (payload.args != null) lines.push(`  args     : ${JSON.stringify(payload.args)}`);
    lines.push(`────────────────────────────────────────────`);

    console.log(lines.join('\n'));

    return { ok: true };
  }
}
