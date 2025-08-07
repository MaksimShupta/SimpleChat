using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using SimpleChat.Interfaces;
using SimpleChat.Models;

namespace SimpleChat.Hubs;

public class ChatHub: Hub<IClient>
{
    private readonly IDistributedCache _cache;
    
    public ChatHub(IDistributedCache cache)
    {
        _cache = cache;
    }
    /// <summary>
    /// Connects/joins a chat
    /// </summary>
    /// <param name="connection">a connection</param>
    public async Task Join(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.chatGroup);
        var strConnection = JsonSerializer.Serialize(connection);
        await _cache.SetStringAsync(Context.ConnectionId,strConnection); // set value in cache
        //let's inform others that the user has joined the chat
        await Clients.Group(connection.chatGroup)
            .GetMessage("Administrator",$"{connection.user} has joined the chat");
    }
    /// <summary>
    /// Sends a user message
    /// </summary>
    /// <param name="message">user message</param>
    public async Task SendMessage(string message)
    {
        var connectionData = await _cache.GetAsync(Context.ConnectionId);
        //deserialize connection data
        var connection = JsonSerializer.Deserialize<UserConnection>(connectionData);
        if (connection != null) 
        {
            await Clients.Group(connection.chatGroup)
                .GetMessage(connection.user, message);
        }
        
    }
}
