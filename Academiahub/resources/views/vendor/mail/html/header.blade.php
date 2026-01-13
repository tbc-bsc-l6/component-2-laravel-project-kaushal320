@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Laravel' || trim($slot) === config('app.name'))
            <span style="font-size: 28px; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 14px 28px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);">
                {{ config('app.name') }}
            </span>
            @else
            {!! $slot !!}
            @endif
        </a>
    </td>
</tr>